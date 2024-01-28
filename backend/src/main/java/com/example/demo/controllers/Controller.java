package com.example.demo.controllers;

import com.example.demo.dto.FormData;
import com.example.demo.dto.StringData;
import com.example.demo.jcolibri.App;
import com.example.demo.jcolibri.CaseDescription;
import com.example.demo.services.DrDeviceService;
import com.example.demo.services.JudgementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
}
