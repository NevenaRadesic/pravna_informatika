package com.example.demo.controllers;

import com.example.demo.dto.CaseRecord;
import com.example.demo.dto.FormData;
import com.example.demo.dto.StringData;
import com.example.demo.jcolibri.App;
import com.example.demo.jcolibri.CaseDescription;
import com.example.demo.services.DrDeviceService;
import com.example.demo.services.JudgementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.opencsv.bean.CsvToBeanBuilder;

import java.io.FileReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

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
}
