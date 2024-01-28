package com.example.demo.jcolibri;


import com.example.demo.dto.FormData;
import com.example.demo.enums.FinancialStatus;
import es.ucm.fdi.gaia.jcolibri.cbrcore.Attribute;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CaseComponent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CaseDescription implements CaseComponent {

	private int id;
	private String sud;
	private String poslovniBroj;
	private String datum;
	private String sudija;
	private String tuzilac;
	private String okrivljeni;
	private String krivicnoDelo;
	private String vrstaDela;

	private String vrstaPresude;

//	private ArrayList<CounterfeitingType> counterfeitingType;
	private int counterfeitItemCount;
	private Double amountOfMoney;
	private int accomplicesCount;

	private boolean extendedCriminalActivity;
	private FinancialStatus financialStatus;
	private String nationality;
	private List<String> primenjeniPropisi;


//	TODO: neki atributi nisu postavljeni
	public CaseDescription(FormData f) {
		this.sud = f.getCourt();
		this.poslovniBroj = f.getJudgementNumber();
		this.datum = getCurrentFormattedDate();
		this.sudija = f.getJudge();
		this.tuzilac = f.getProsecutor();
		this.okrivljeni = f.getDefendant();
		this.krivicnoDelo = "Falsifikovanje novca";
		this.vrstaDela = f.getCrime();
		this.amountOfMoney = f.getTotalAmount();
		this.extendedCriminalActivity = f.isExtendedCriminalActivity();
		this.financialStatus = FinancialStatus.valueOf(f.getFinancialStatus());
	}

	public static String getCurrentFormattedDate() {
		LocalDate currentDate = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		String formattedDate = currentDate.format(formatter);
		return formattedDate;
	}

	@Override
	public Attribute getIdAttribute() {
		return new Attribute("id", this.getClass());
	}


	
}
