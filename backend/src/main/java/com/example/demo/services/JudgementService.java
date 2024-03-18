package com.example.demo.services;

import com.example.demo.dto.FormData;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Service
public class JudgementService {
    public void addNewJudgement(FormData c) {
        // TODO: staviti relativnu putanju
        String filePath = "src/main/resources/presude3.csv";

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

}
