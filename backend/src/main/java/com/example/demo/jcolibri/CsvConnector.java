package com.example.demo.jcolibri;

import com.example.demo.enums.CounterfeitingType;
import com.example.demo.enums.FinancialStatus;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CBRCase;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CaseBaseFilter;
import es.ucm.fdi.gaia.jcolibri.cbrcore.Connector;
import es.ucm.fdi.gaia.jcolibri.exception.InitializingException;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedList;

public class CsvConnector implements Connector {
	
	@Override
	public Collection<CBRCase> retrieveAllCases() {
		LinkedList<CBRCase> cases = new LinkedList<CBRCase>();
		
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/presude.csv")));
			if (br == null)
				throw new Exception("Error opening file");

			String line = "";
			while ((line = br.readLine()) != null) {
				if (line.startsWith("#") || (line.length() == 0))
					continue;
				String[] values = line.split(";");

				CBRCase cbrCase = new CBRCase();

				CaseDescription caseDescription = new CaseDescription();
				caseDescription.setId(Integer.parseInt(values[0]));
				caseDescription.setSud(values[1]);
				caseDescription.setPoslovniBroj(values[2]);
				caseDescription.setDatum(values[3]);
				caseDescription.setSudija(values[4]);
				caseDescription.setTuzilac(values[5]);
				caseDescription.setOkrivljeni(values[6]);
				caseDescription.setKrivicnoDelo(values[7]);
				caseDescription.setVrstaDela(values[8].toUpperCase());
				caseDescription.setCounterfeitItemCount(Integer.parseInt(values[9]));
				caseDescription.setAmountOfMoney(values[10] != null && !values[10].isEmpty() ? Double.parseDouble(values[10]) : null);
				caseDescription.setFinancialStatus(FinancialStatus.valueOf(values[11].toUpperCase()));

				caseDescription.setExtendedCriminalActivity(convertFromSerbian(values[12]));
				caseDescription.setNationality(values[13]);
				caseDescription.setAccomplicesCount(Integer.parseInt(values[14]));
				caseDescription.setVrstaPresude(values[15]);
				caseDescription.setPrimenjeniPropisi(values[16]);


//				caseDescription.setCounterfeitingType(getCounterfeitingTypeFromString(values[8]));


				cbrCase.setDescription(caseDescription);
				cases.add(cbrCase);
			}
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cases;
	}

	private boolean convertFromSerbian(String value) {
		return (value.equalsIgnoreCase("da") || value.equalsIgnoreCase("true"));
	}

	private ArrayList<CounterfeitingType> getCounterfeitingTypeFromString(String value) {
		ArrayList<CounterfeitingType> retVal = new ArrayList<CounterfeitingType>();
		for (String s : value.split(","))
		{
			retVal.add(CounterfeitingType.valueOf(s));
		}
		return retVal;
	}

	@Override
	public Collection<CBRCase> retrieveSomeCases(CaseBaseFilter arg0) {
		return null;
	}

	@Override
	public void storeCases(Collection<CBRCase> arg0) {
	}
	
	@Override
	public void close() {
	}

	@Override
	public void deleteCases(Collection<CBRCase> arg0) {
	}

	@Override
	public void initFromXMLfile(URL arg0) throws InitializingException {
	}

}