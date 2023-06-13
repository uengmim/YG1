package com.yg1.yoswebapp;

import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.File;
import java.util.function.Consumer;
import java.util.concurrent.Executors;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * YG1 Ordering System Web Application
 */
@SpringBootApplication
@EnableJpaRepositories("com.yg1.yoswebapp.model")
public class YOSWebApplication {
	/**
	 * windows 여부
	 */
	 private static boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");

	/**
	 * Application Startup 디렉토리
	 */
	private static String startupDirectory = System.getProperty("user.dir");

	/**
	 * Angular Process
	*/
	private static Process angularProcess;
	
	/**
	 * 버전 확인용  yyMMddHHmm (20년 7월 7일 13시 46분 → 2007071346)
	 */
	public static final Long version = 2306011332L;
	
	/**
	 * Process IN/OUT Stream
	 */
	private static class StreamGobbler implements Runnable {
		private InputStream inputStream;
		private Consumer<String> consumer;

		public StreamGobbler(InputStream inputStream, Consumer<String> consumer) {
			this.inputStream = inputStream;
			this.consumer = consumer;
		}

		@Override
		public void run() {
			new BufferedReader(new InputStreamReader(inputStream)).lines().forEach(consumer);
		}
	}

	/**
	 * 프로그램 진입점
	 * @param args 명령인수
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		try {
			startup();
			SpringApplication.run(YOSWebApplication.class, args);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
	}

	/**
	 * anglar를 시작 한다.
	 */
	private static void startup() {
		try {
			String npm = isWindows ? "npm.cmd" : "npm";

			ProcessBuilder pb = new ProcessBuilder(npm, "start");

			pb.directory(new File(String.format("%s/clientapp", startupDirectory)));

			angularProcess = pb.start();

			// angularProcess = pb.start();
			StreamGobbler streamGobbler = new StreamGobbler(angularProcess.getInputStream(), System.out::println);
			// StreamGobbler streamGobbler = new StreamGobbler(angularProcess.getInputStream(), System.out::println);
			Executors.newSingleThreadExecutor().submit(streamGobbler);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
	}
	
}
