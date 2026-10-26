package com.carimport.ops;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Properties;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.support.StaticListableBeanFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

class MailCheckTest {

    private static MailCheck check(String host, int port) {
        StaticListableBeanFactory beans = new StaticListableBeanFactory();
        JavaMailSenderImpl impl = new JavaMailSenderImpl();
        impl.setHost(host);
        impl.setPort(port);
        impl.setUsername("shop@gmail.com");
        impl.setPassword("wrong");
        Properties p = new Properties();
        p.put("mail.smtp.auth", "true");
        p.put("mail.smtp.connectiontimeout", "2000");
        p.put("mail.smtp.timeout", "2000");
        impl.setJavaMailProperties(p);
        beans.addBean("mailSender", impl);
        return new MailCheck(beans.getBeanProvider(JavaMailSender.class), host, "shop@gmail.com",
                "Carglo <shop@gmail.com>", "", "contact@example.com");
    }

    @Test
    void emptyHostSaysMailIsOff() {
        MailCheck.Result r = check("", 587).connect();
        assertThat(r.ok()).isFalse();
        assertThat(r.message()).contains("SMTP_HOST is empty");
    }

    @Test
    void rejectedPasswordPointsAtCredentials() throws Exception {
        try (ServerSocket server = new ServerSocket(0)) {
            Thread smtp = Thread.ofVirtual().start(() -> fakeSmtpRejectingLogin(server));
            MailCheck.Result r = check("localhost", server.getLocalPort()).connect();
            smtp.join(5000);
            assertThat(r.ok()).isFalse();
            assertThat(r.message()).contains("SMTP login FAILED").contains("SMTP_PASSWORD");
        }
    }

    @Test
    void closedPortPointsAtHost() throws Exception {
        int port;
        try (ServerSocket s = new ServerSocket(0)) {
            port = s.getLocalPort();
        }
        MailCheck.Result r = check("localhost", port).connect();
        assertThat(r.ok()).isFalse();
        assertThat(r.message()).contains("SMTP_HOST/SMTP_PORT");
    }

    private static void fakeSmtpRejectingLogin(ServerSocket server) {
        try (Socket s = server.accept();
             BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream(), StandardCharsets.US_ASCII));
             PrintWriter out = new PrintWriter(s.getOutputStream(), true)) {
            out.print("220 fake ESMTP\r\n");
            out.flush();
            String line;
            while ((line = in.readLine()) != null) {
                String cmd = line.toUpperCase();
                if (cmd.startsWith("EHLO")) {
                    out.print("250-fake\r\n250 AUTH LOGIN PLAIN\r\n");
                } else if (cmd.startsWith("AUTH")) {
                    out.print("535 5.7.8 Username and Password not accepted\r\n");
                } else if (cmd.startsWith("QUIT")) {
                    out.print("221 bye\r\n");
                    out.flush();
                    return;
                } else {
                    out.print("250 ok\r\n");
                }
                out.flush();
            }
        } catch (Exception ignored) {
            // the client hung up
        }
    }
}
