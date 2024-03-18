from langchain_community.document_loaders import PyMuPDFLoader
from pathlib import Path


def parse_pdf(path):
    loader = PyMuPDFLoader(str(path))
    data = loader.load()

    end_words = ['obrazlozenje', 'obrazloženje', 'o b r a z l o ž e nj e', 'o b r a z l o ž e n j e']

    end = False
    i = 0
    text = ""

    while not end and i <= len(data) - 1:
        page_text = data[i].page_content
        has_end_word = [ew in page_text.lower() for ew in end_words]
        if any(has_end_word):
            found_end_word = end_words[has_end_word.index(True)]
            page_text = page_text[:page_text.lower().index(found_end_word)]
            end = True
            text += ' ' + page_text
            continue

        text += ' ' + page_text
        i += 1

    return text


# find all pdfs in the directory
pdfs = list(Path("./pdf").rglob("*.pdf"))
for pdf in pdfs:
    text = parse_pdf(pdf)
    Path(f'./text/{pdf.stem}.txt').write_text(text)
