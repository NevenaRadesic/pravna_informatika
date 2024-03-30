package com.example.demo.services;

import com.example.demo.dto.FormData;
import com.example.demo.enums.CrimeType;
import com.example.demo.enums.FinancialStatus;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DrDeviceService {

    public String makeDecisionBasedOnLaw(FormData data)
    {
        this.runScript("./dr-device/clean.bat");
        this.createFile(data);
        this.runScript("./dr-device/start.bat");
        return this.createAnswer();
    }

    private String createAnswer() {
        String content = readExport("./dr-device/export.rdf");
        String finalResult = addCrime(content);
        finalResult = addPenalty(finalResult, content);
        return finalResult;
    }

    //TODO mozda refaktorisati
    private String addPenalty(String finalResult, String input) {
        ArrayList<String> possiblePenalties = getPossiblePenalties();
        HashMap<String, String> dict = getSentenceDict();
        for (String match : possiblePenalties)
        {
            String fullRegex = "<export:" + match + " rdf:about='&export;" + match + "(\\d+)'>\\s*<export:value>(\\d+)</export:value>\\s*<defeasible:truthStatus>defeasibly-proven-positive</defeasible:truthStatus>\\s*<defeasible:proof rdf:datatype='&xsd;anyURI'>&proof-export;proof(\\d+)</defeasible:proof>\\s*</export:" + match + ">";
            Pattern pattern = Pattern.compile(fullRegex);
            Matcher matcher = pattern.matcher(input);
            while (matcher.find()) {
                if (match.equals("min_imprisonment")) finalResult += dict.get(match) + matcher.group(2);
                else finalResult += dict.get(match) + matcher.group(2) + " godina.";
            }
        }
        return finalResult;
    }

    private String addCrime(String input) {
        String finalResult = "";
        ArrayList<String> possibleCrimes = getPossibleMatches();
        HashMap<String, String> dict = getSentenceDict();
        for (String match : possibleCrimes)
        {
            String fullRegex = "(?s)export:" + match + " rdf:about.*defeasibly-proven-positive.*export:" + match + ">";
            Pattern pattern = Pattern.compile(fullRegex);
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                finalResult += dict.get(match);
            }
        }
        return finalResult;
    }

    private String readExport(String filePath) {
        String content = "";
        try {
            Path path = Paths.get(filePath);
            byte[] bytes = Files.readAllBytes(path);
            content = new String(bytes, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception as needed
        }
        return content;
    }

    private void runScript(String scriptPath) {
        ProcessBuilder processBuilder = new ProcessBuilder(scriptPath);
        try {
            Process process = processBuilder.start();
            int exitCode = process.waitFor();
            System.out.println("Batch script exited with code: " + exitCode);
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }

    private void createFile(FormData data) {
        HashMap<String, String> dict = createDict();
        String text = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
                "<rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n" +
                "        xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n" +
                "        xmlns:xsd=\"http://www.w3.org/2001/XMLSchema#\"\n" +
                "        xmlns:lc=\"http://informatika.ftn.uns.ac.rs/legal-case.rdf#\">\n" +
                "    <lc:case rdf:about=\"http://informatika.ftn.uns.ac.rs/legal-case.rdf#counterfeiting_case\">\n" +
                "        <lc:name>Case 01</lc:name>\n" +
                "        <lc:defendant>John Doe</lc:defendant>\n" +
                "        <lc:crime_type>" + dict.get(data.getCrime()) + "</lc:crime_type>\n" +
                "        <lc:amount rdf:datatype=\"http://www.w3.org/2001/XMLSchema#double\">" + data.getTotalAmount() +
                "</lc:amount>\n" +
                "        <lc:financial_condition>" + dict.get(data.getFinancialStatus()) + "</lc:financial_condition>\n" +
                "        <lc:extended_criminal_activity>" + data.isExtendedCriminalActivity()+ "</lc:extended_criminal_activity>\n" +
                "    </lc:case>\n" +
                "</rdf:RDF>";
        writeToFile(text);
    }

    private void writeToFile(String text) {
//        String filePath = "../../../../../../../../dr-device/facts.rdf";
//        String filePath = "C:\\Users\\Nevena\\Desktop\\pravna projekat\\nas pravo\\dr-device\\facts.rdf";
        String filePath = "../../nas pravo/dr-device/facts.rdf";
        try {
            Path path = Paths.get(filePath);
            Files.createDirectories(path.getParent());
            try (BufferedWriter writer = Files.newBufferedWriter(path)) {
                writer.write(text);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private HashMap<String, String> createDict() {
        HashMap<String, String> dict = new HashMap<>();
        dict.put(String.valueOf(CrimeType.PROIZVODNJA), "counterfeiting_money");
        dict.put(String.valueOf(CrimeType.PRIBAVLJANJE_I_KORISTENJE), "procurement_of_counterfeit_money");
        dict.put(String.valueOf(CrimeType.NEPRIJAVLJIVANJE), "failure_to_report");
        dict.put(String.valueOf(FinancialStatus.LOSE), "poor");
        dict.put(String.valueOf(FinancialStatus.SREDNJE), "moderate");
        dict.put(String.valueOf(FinancialStatus.DOBRO), "good");
        return dict;
    }

    private ArrayList<String> getPossibleMatches() {
        ArrayList<String> r = new ArrayList<>();
        r.add("counterfeiting_money_under_15000");
        r.add("counterfeiting_money_over_15000");
        r.add("procurement_money_under_15000");
        r.add("procurement_money_over_15000");
        r.add("counterfeiting_money_under_15000_mitigating_circumstances");
        r.add("counterfeiting_money_over_15000_mitigating_circumstances");
        r.add("procurement_money_under_15000_mitigating_circumstances");
        r.add("procurement_money_over_15000_mitigating_circumstances");
        r.add("counterfeiting_money_under_15000_aggravating_circumstances");
        r.add("counterfeiting_money_over_15000_aggravating_circumstances");
        r.add("procurement_money_under_15000_aggravating_circumstances");
        r.add("procurement_money_over_15000_aggravating_circumstances");
        r.add("failure_to_report");
        return r;
    }

    private HashMap<String, String> getSentenceDict() {
        HashMap<String, String> r = new HashMap<>();
        r.put("counterfeiting_money_under_15000", "Okrivljeni je počinio krivično djelo pravljenja falsifikovanog novca u vrednosti koja ne prelazi 15000 evra (čl 258. st. 1. KZCG). ");
        r.put("counterfeiting_money_over_15000", "Okrivljeni je počinio krivično djelo pravljenja falsifikovanog novca u vrednosti koja prelazi 15000 evra (čl 258. st. 1. 3. KZCG). ");
        r.put("procurement_money_under_15000", "Okrivljeni je počinio krivično djelo pribavljanja i korištenja falsifikovanog novca u vrednosti koja ne prelazi 15000 evra (čl 258. st. 2. KZCG). ");
        r.put("procurement_money_over_15000", "Okrivljeni je počinio krivično djelo pribavljanja i korištenja falsifikovanog novca u vrednosti koja prelazi 15000 evra (čl 258. st. 2. 3. KZCG). ");

        r.put("counterfeiting_money_under_15000_mitigating_circumstances", "Okrivljeni, lošeg imovinskog stanja (čl. 42. st. 2. KZCG) je počinio krivično djelo pravljenja falsifikovanog novca u vrednosti koja ne prelazi 15000 evra (čl 258. st. 1. KZCG). ");
        r.put("counterfeiting_money_over_15000_mitigating_circumstances", "Okrivljeni, lošeg imovinskog stanja (čl. 42. st. 2. KZCG) je počinio krivično djelo pravljenja falsifikovanog novca u vrednosti koja prelazi 15000 evra (čl 258. st. 1. 3. KZCG). ");
        r.put("procurement_money_under_15000_mitigating_circumstances", "Okrivljeni, lošeg imovinskog stanja (čl. 42. st. 2. KZCG) je počinio krivično djelo pribavljanja i korištenja falsifikovanog novca u vrednosti koja ne prelazi 15000 evra (čl 258. st. 2. KZCG). ");
        r.put("procurement_money_over_15000_mitigating_circumstances", "Okrivljeni, lošeg imovinskog stanja (čl. 42. st. 2. KZCG) je počinio krivično djelo pribavljanja i korištenja falsifikovanog novca u vrednosti koja prelazi 15000 evra (čl 258. st. 2. 3. KZCG). ");

        r.put("counterfeiting_money_under_15000_aggravating_circumstances", "Okrivljeni je počinio produženo krivično djelo (čl. 49) pravljenja falsifikovanog novca u vrednosti koja ne prelazi 15000 evra (čl 258. st. 1. KZCG). ");
        r.put("counterfeiting_money_over_15000_aggravating_circumstances", "Okrivljeni je počinio produženo krivično djelo (čl. 49) pravljenja falsifikovanog novca u vrednosti koja prelazi 15000 evra (čl 258. st. 1. 3. KZCG). ");
        r.put("procurement_money_under_15000_aggravating_circumstances", "Okrivljeni je počinio produženo krivično djelo (čl. 49) pribavljanja i korištenja falsifikovanog novca u vrednosti koja ne prelazi 15000 evra (čl 258. st. 2. KZCG). ");
        r.put("procurement_money_over_15000_aggravating_circumstances", "Okrivljeni je počinio produženo krivično djelo (čl. 49) pribavljanja i korištenja falsifikovanog novca u vrednosti koja prelazi 15000 evra (čl 258. st. 2. 3. KZCG). ");

        r.put("failure_to_report", "Okrivljeni je počinio krivično djelo neprijavljivanje falsifikovanog novca (čl 258. st. 4. KZCG) kojeg je primio kao pravi. ");

        r.put("min_imprisonment", "Te ga sud primjenom pomenutih propisa osuđuje na zatvorsku kaznu u trajanju od minimum ");
        r.put("max_imprisonment", ", a najviše ");
        return r;
    }

    private ArrayList<String> getPossiblePenalties() {
        ArrayList<String> r = new ArrayList<>();
        r.add("min_imprisonment");
        r.add("max_imprisonment");
        return r;
    }


}
