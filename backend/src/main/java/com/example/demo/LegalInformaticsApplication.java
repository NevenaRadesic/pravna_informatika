package com.example.demo;

import com.example.demo.jcolibri.App;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.xml.transform.sax.SAXResult;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class LegalInformaticsApplication {

	public static void main(String[] args) {

		SpringApplication.run(LegalInformaticsApplication.class, args);
	}
}
