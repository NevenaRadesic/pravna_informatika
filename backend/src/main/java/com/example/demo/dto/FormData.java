package com.example.demo.dto;

import com.example.demo.jcolibri.CaseDescription;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
public class FormData {
    // {"court":"privredni-sud-bijelo-polje","judgementNumber":"","judge":"","prosecutor":"","crime":"",
    // "defendant":"","extendedCriminalActivity":"","financialStatus":""}
    private String court;
    private int id;
    private String judgementNumber;
    private String judge;
    private String prosecutor;
    private String crime;
    private String defendant;
    private boolean extendedCriminalActivity;
    private String financialStatus;
    private double totalAmount;
    private int numberOfBanknotes;
    private double similarity;


    private String appliedRules;
    private String judgementType;

    public FormData (CaseDescription cd) {
        this.id = cd.getId();
        this.court = cd.getSud();
        this.judgementNumber = cd.getPoslovniBroj();
        this.judge = cd.getSudija();
        this.prosecutor = cd.getTuzilac();
        this.crime = cd.getVrstaDela();
        this.defendant = cd.getOkrivljeni();
        this.extendedCriminalActivity = cd.isExtendedCriminalActivity();
        this.financialStatus = String.valueOf(cd.getFinancialStatus());
        this.numberOfBanknotes = cd.getCounterfeitItemCount();
        this.totalAmount = cd.getAmountOfMoney();
        this.appliedRules = cd.getPrimenjeniPropisi();
    }

    public String toCSV() {
        String separator = "|";
        return this.id + separator + this.court + separator + this.judgementNumber + separator +
                getCurrentFormattedDateWithDots() + separator + this.judge + separator + this.prosecutor + separator +
                defendant + separator + "Falsifikovanje novca" + separator + this.crime.toLowerCase() + separator + numberOfBanknotes + separator +
                totalAmount + separator + financialStatus.toLowerCase() + separator + (extendedCriminalActivity ? "da" : "ne")  + separator + "Crna Gora" +
                separator + "1" + separator + judgementType + separator + appliedRules ;
    }



    private String getCurrentFormattedDateWithDots() {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        String formattedDate = currentDate.format(formatter);
        return formattedDate;
    }
}
