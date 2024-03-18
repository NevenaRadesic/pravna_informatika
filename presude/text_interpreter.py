import pathlib
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

llm = ChatOpenAI(model="gpt-4", temperature=0)

presuda = pathlib.Path("./akoma ntoso/K 399 2015.xml").read_text()


def process_text(text, file_path):
    conclusion_example = """
    _____
    Na osnovu
        <ref href="/krivicni#art_75">
            čl. 75
        </ref>
        i
        <ref href="/krivicni#art_258">
            čl. 258 st. 5 Krivičnog zakonika Crne Gore
        </ref>
        sud izriče...
    _____
    """
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "Ti prevodiš tekst o presudama u akomaNtoso xml dokumente, primer ti je dat ispod.\n"
             +
             "PRIMER: \n {presuda} \n"
             +
             "Molim vas da prevedete ovaj tekst u akomaNtoso XML format. Vratite mi validan XML dokument, i ništa drugo."
             "OBAVEZNO koristiti reference kad se spominje 'Na osnovu' u conclusion, kao npr. \n {conclusion_example} \n"
             ""),
            ("user", "{input}")
        ]
    )

    chain = prompt | llm
    response = chain.invoke({"presuda": presuda, "conclusion_example": conclusion_example, "input": text})
    print(response.content)
    # save response to file
    pathlib.Path(f"./xml/{file_path.stem}.xml").write_text(response.content)


text_files = list(pathlib.Path("./text").rglob("*.txt"))
for text_file in text_files[1:5]:
    text = pathlib.Path(text_file).read_text()
    process_text(text, text_file)
