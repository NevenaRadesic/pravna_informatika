package com.example.demo.jcolibri;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;


import com.example.demo.dto.FormData;
import com.example.demo.enums.CrimeType;
import com.example.demo.enums.FinancialStatus;
import es.ucm.fdi.gaia.jcolibri.casebase.LinealCaseBase;
import es.ucm.fdi.gaia.jcolibri.cbraplications.StandardCBRApplication;
import es.ucm.fdi.gaia.jcolibri.cbrcore.Attribute;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CBRCase;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CBRCaseBase;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CBRQuery;
import es.ucm.fdi.gaia.jcolibri.cbrcore.Connector;
import es.ucm.fdi.gaia.jcolibri.exception.ExecutionException;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.similarity.local.Interval;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.RetrievalResult;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.NNConfig;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.NNScoringMethod;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.similarity.global.Average;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.selection.SelectCases;

public class App implements StandardCBRApplication {

    Connector _connector;  /** Connector object */
    CBRCaseBase _caseBase;  /** CaseBase object */

    NNConfig simConfig;  /** KNN configuration */

    public void configure() throws ExecutionException {
        _connector =  new CsvConnector();

        _caseBase = new LinealCaseBase();  // Create a Lineal case base for in-memory organization

        simConfig = new NNConfig();
        simConfig.setDescriptionSimFunction(new Average());  // global similarity function = average

//		simConfig.addMapping(new Attribute("krivicnoDelo", CaseDescription.class), new Equal());

        TabularSimilarity slicnostMaterijalnogStanja = new TabularSimilarity(Arrays.asList(String.valueOf(FinancialStatus.DOBRO), String.valueOf(FinancialStatus.SREDNJE), String.valueOf(FinancialStatus.LOSE)));
        slicnostMaterijalnogStanja.setSimilarity(String.valueOf(FinancialStatus.DOBRO), String.valueOf(FinancialStatus.SREDNJE), 0.9);
        slicnostMaterijalnogStanja.setSimilarity(String.valueOf(FinancialStatus.DOBRO), String.valueOf(FinancialStatus.LOSE), 0.3);
        slicnostMaterijalnogStanja.setSimilarity(String.valueOf(FinancialStatus.SREDNJE), String.valueOf(FinancialStatus.LOSE), 0.4);
        simConfig.addMapping(new Attribute("financialStatus", CaseDescription.class), slicnostMaterijalnogStanja);

        simConfig.addMapping(new Attribute("amountOfMoney", CaseDescription.class), new Interval(15000));

        TabularSimilarity extendedCriminalActivity = new TabularSimilarity(Arrays.asList(String.valueOf(true), String.valueOf(false)));
        extendedCriminalActivity.setSimilarity(String.valueOf(true), String.valueOf(false), 0.4);
        simConfig.addMapping(new Attribute("extendedCriminalActivity", CaseDescription.class), extendedCriminalActivity);

        TabularSimilarity crimeType = new TabularSimilarity(Arrays.asList(String.valueOf(CrimeType.PROIZVODNJA), String.valueOf(CrimeType.PRIBAVLJANJE_I_KORISTENJE), String.valueOf(CrimeType.NEPRIJAVLJIVANJE)));
        crimeType.setSimilarity(String.valueOf(CrimeType.PROIZVODNJA), String.valueOf(CrimeType.PRIBAVLJANJE_I_KORISTENJE), 0.9);
        crimeType.setSimilarity(String.valueOf(CrimeType.PROIZVODNJA), String.valueOf(CrimeType.NEPRIJAVLJIVANJE), 0.2);
        crimeType.setSimilarity(String.valueOf(CrimeType.PRIBAVLJANJE_I_KORISTENJE), String.valueOf(CrimeType.NEPRIJAVLJIVANJE), 0.2);
        simConfig.addMapping(new Attribute("vrstaDela", CaseDescription.class), crimeType);



//		TabularSimilarity slicnostPropisa = new TabularSimilarity(Arrays.asList("cl. 42 st. 1 ZOBSNP",
//				"cl. 43 st. 1 ZOBSNP",
//				"cl. 47 st. 1 ZOBSNP",
//				"cl. 47 st. 3 ZOBSNP",
//				"cl. 47 st. 4 ZOBSNP"));
//
//		slicnostPropisa.setSimilarity("cl. 42 st. 1 ZOBSNP", "cl. 43 st. 1 ZOBSNP", .5);
//		slicnostPropisa.setSimilarity("cl. 47 st. 1 ZOBSNP", "cl. 47 st. 3 ZOBSNP", .5);
//		slicnostPropisa.setSimilarity("cl. 47 st. 3 ZOBSNP", "cl. 47 st. 4 ZOBSNP", .5);
//		slicnostPropisa.setSimilarity("cl. 47 st. 1 ZOBSNP", "cl. 47 st. 4 ZOBSNP", .5);
//		simConfig.addMapping(new Attribute("primenjeniPropisi", CaseDescription.class), slicnostPropisa);

        // Equal - returns 1 if both individuals are equal, otherwise returns 0
        // Interval - returns the similarity of two number inside an interval: sim(x,y) = 1-(|x-y|/interval)
        // Threshold - returns 1 if the difference between two numbers is less than a threshold, 0 in the other case
        // EqualsStringIgnoreCase - returns 1 if both String are the same despite case letters, 0 in the other case
        // MaxString - returns a similarity value depending of the biggest substring that belong to both strings
        // EnumDistance - returns the similarity of two enum values as the their distance: sim(x,y) = |ord(x) - ord(y)|
        // EnumCyclicDistance - computes the similarity between two enum values as their cyclic distance
        // Table - uses a table to obtain the similarity between two values. Allowed values are Strings or Enums. The table is read from a text file.
        // TabularSimilarity - calculates similarity between two strings or two lists of strings on the basis of tabular similarities
    }

    public void cycle(CBRQuery query) throws ExecutionException {
        Collection<RetrievalResult> eval = NNScoringMethod.evaluateSimilarity(_caseBase.getCases(), query, simConfig);
        eval = SelectCases.selectTopKRR(eval, 5);
        System.out.println("Retrieved cases:");
        for (RetrievalResult nse : eval)
            System.out.println(nse.get_case().getDescription() + " -> " + nse.getEval());
    }

    public ArrayList<FormData> getSimilarCases(CBRQuery query) throws ExecutionException {
        ArrayList<FormData> cd = new ArrayList<>();
        Collection<RetrievalResult> eval = NNScoringMethod.evaluateSimilarity(_caseBase.getCases(), query, simConfig);
        eval = SelectCases.selectTopKRR(eval, 5);
        System.out.println("Retrieved cases:");
        for (RetrievalResult nse : eval)
        {
            System.out.println(nse.get_case().getDescription() + " -> " + nse.getEval());
            FormData fd = new FormData ((CaseDescription) nse.get_case().getDescription());
            fd.setSimilarity(nse.getEval());
            cd.add(fd);
        }
        return cd;

    }

    public void postCycle() throws ExecutionException {

    }

    public CBRCaseBase preCycle() throws ExecutionException {
        _caseBase.init(_connector);
        java.util.Collection<CBRCase> cases = _caseBase.getCases();
//		for (CBRCase c: cases)
//			System.out.println(c.getDescription());
        return _caseBase;
    }

    public static ArrayList<FormData> findSimilarJudgements(FormData data) {
        StandardCBRApplication recommender = new App();
        try {
            recommender.configure();
            recommender.preCycle();
            CBRQuery query = new CBRQuery();


//			caseDescription.setKrivicnoDelo("cl. 289 st. 3 KZ");
//			List<String> primenjeniPropisi = new ArrayList();
//			primenjeniPropisi.add("cl. 55 st. 3 tac. 15 ZOBSNP");
//			primenjeniPropisi.add("cl. 43 st. 1 ZOBSNP");
//			caseDescription.setPrimenjeniPropisi(primenjeniPropisi);


//            CaseDescription caseDescription = new CaseDescription();
//            caseDescription.setFinancialStatus(FinancialStatus.LOSE);
//            caseDescription.setAmountOfMoney(12.45);
//            caseDescription.setExtendedCriminalActivity(false);
            CaseDescription cd = new CaseDescription(data);


            query.setDescription(cd);
            recommender.postCycle();
            return ((App) recommender).getSimilarCases(query);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
