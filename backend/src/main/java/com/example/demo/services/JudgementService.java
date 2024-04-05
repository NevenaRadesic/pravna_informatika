package com.example.demo.services;

import com.example.demo.dto.CreateJudgementDTO;
import com.example.demo.dto.FormData;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.property.TextAlignment;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class JudgementService {
    public void addNewJudgement(FormData c) {
        // TODO: staviti relativnu putanju
        String filePath = "backend/src/main/resources/presude3.csv";

        try {
            String fileContent = readFile(filePath);
            String updatedContent = fileContent + c.toCSV();
            writeFile(filePath, updatedContent);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    private static String readFile(String filePath) throws IOException {
        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        }

        return content.toString();
    }

    private static void writeFile(String filePath, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write(content);
        }
    }

    public void createAkomaNtoso(CreateJudgementDTO content) {
        // save to /presude/text/UUID.txt
        String filePath = "./presude/text/" + content.getId() + ".txt";
        try {
            Path path = Paths.get(filePath);
            Files.write(path, content.getText().getBytes());
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
        // replace spaces with \
        filePath = filePath.replace(" ", "\\ ");
        System.out.println("source ./presude/venv/bin/activate && python presude/text_interpreter_new.py -i " + filePath);
        // create subprocess call to python script
        try {
            ProcessBuilder pb = new ProcessBuilder("bash", "-c", "source ./presude/venv/bin/activate && python presude/text_interpreter_new.py -i " + filePath);
            pb.inheritIO();
            Process p = pb.start();
            p.waitFor();
        } catch (IOException | InterruptedException e) {
            System.err.println("Error: " + e.getMessage());
        }

    }

    public void createPdf(CreateJudgementDTO content) throws IOException {
        System.out.println("todo: create pdf from content");
        String fileName = content.getId();
        fileName = fileName.replace(" ", "\\ ");
        String fullPath = "./presude/pdf/" + fileName + ".pdf";
        PdfWriter writer = new PdfWriter(Files.newOutputStream(Paths.get(fullPath)));
        PdfDocument pdfDoc = new PdfDocument(writer);
        pdfDoc.addNewPage();

        String htmlContent = "<html><head>" +
                "<style>" +
                "h1 {text-align: center;}" +
                "h2 {text-align: center;}" +
                "h3 {text-align: center;}" +
                "h4 {text-align: center;}" +
                "p {text-align: justify;}" +
                "</style>" +
                "</head><body><h1>Presuda</h1><p>" + content.getHtml() + "</p></body></html>";

        HtmlConverter.convertToPdf(htmlContent, pdfDoc.getWriter());
    }
}
