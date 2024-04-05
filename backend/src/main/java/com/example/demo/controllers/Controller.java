package com.example.demo.controllers;

import com.example.demo.dto.CaseRecord;
import com.example.demo.dto.CreateJudgementDTO;
import com.example.demo.dto.FormData;
import com.example.demo.dto.StringData;
import com.example.demo.jcolibri.App;
import com.example.demo.services.DrDeviceService;
import com.example.demo.services.JudgementService;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.opencsv.bean.CsvToBeanBuilder;
import java.io.FileReader;
import java.io.IOException;

import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Files;

@RestController
@CrossOrigin(origins = "*")
public class Controller {

    @Autowired
    DrDeviceService drDeviceService;

    @Autowired
    JudgementService judgementService;

    @PostMapping("/similar")
    public ArrayList<FormData> getSimilarJudgements(@RequestBody FormData data) {
        ArrayList<FormData> cd = App.findSimilarJudgements(data);
        return cd;
    }

    @PostMapping("/law")
    public StringData makeDecisionBasedOnLaw(@RequestBody FormData data) {
        String s = this.drDeviceService.makeDecisionBasedOnLaw(data);
        return new StringData(s);
    }

    @PostMapping("/addJudgement")
    public void addJudgement(@RequestBody FormData data) {
        this.judgementService.addNewJudgement(data);

    }

    @PostMapping("/createJudgement")
    public void createJudgement(@RequestBody CreateJudgementDTO content) {
//        System.out.println(content.getText());
//        System.out.println(content.getId());
//        this.judgementService.createAkomaNtoso(content);
        try {
            this.judgementService.createPdf(content);
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }



    @GetMapping("/case-records")
    public List<CaseRecord> getCaseRecords() throws Exception {
        String filePath = "backend/src/main/resources/presude3.csv";
        try (FileReader fileReader = new FileReader(filePath)) {
            List<CaseRecord> caseRecords = new CsvToBeanBuilder<CaseRecord>(fileReader)
                    .withType(CaseRecord.class)
                    .withSeparator('|')
                    .withIgnoreLeadingWhiteSpace(true)
                    .withIgnoreEmptyLine(true)
                    .build()
                    .parse();
            return caseRecords;
        }
    }

    @GetMapping("/law-akoma-ntoso")
    public String getAkomaNtoso() throws IOException {
        String relativePath = "zakoni/Krivicni zakonik.xml";
        List<String> lines = Files.readAllLines(Paths.get(relativePath), StandardCharsets.UTF_8);
        var line = String.join("\n", lines);
        return line;
    }
}
