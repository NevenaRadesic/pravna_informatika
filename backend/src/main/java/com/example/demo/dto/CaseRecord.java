package com.example.demo.dto;


import com.opencsv.bean.CsvBindByName;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.opencsv.bean.CsvBindByName;

@Data
@NoArgsConstructor
public class CaseRecord {
    @CsvBindByName(column = "#id")
    private Long id;
    @CsvBindByName(column = "Sud")
    private String sud;
    @CsvBindByName(column = "Broj presude")
    private String brojPresude;
    @CsvBindByName(column = "Datum")
    private String datum;
    @CsvBindByName(column = "Ime sudije")
    private String imeSudije;
    @CsvBindByName(column = "Tuzilac")
    private String tuzilac;
    @CsvBindByName(column = "Ime optuzenog")
    private String imeOptuzenog;
    @CsvBindByName(column = "Krivicno delo")
    private String krivicnoDelo;
    @CsvBindByName(column = "Vrsta dela")
    private String vrstaDela;
    @CsvBindByName(column = "Broj falsifikovanih novcanica")
    private Integer brojFalsifikovanihNovcanica;
    @CsvBindByName(column = "Ukupna vrednost falsifikovanih novcanica")
    private Double ukupnaVrednostFalsifikovanihNovcanica;
    @CsvBindByName(column = "Imovno stanje optuzenog")
    private String imovnoStanjeOptuzenog;
    @CsvBindByName(column = "Produzeno krivicno delo")
    private String produzenoKrivicnoDelo;
    @CsvBindByName(column = "Drzavljanstvo")
    private String drzavljanstvo;
    @CsvBindByName(column = "Broj optuzenih")
    private Integer brojOptuzenih;
    @CsvBindByName(column = "Vrsta presude")
    private String vrstaPresude;
    @CsvBindByName(column = "Primenjeni propisi")
    private String primenjeniPropisi;

    // Getters and setters
}


