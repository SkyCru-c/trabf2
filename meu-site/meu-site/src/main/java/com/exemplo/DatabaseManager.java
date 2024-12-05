package com.exemplo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseManager {
    private static final String URL = "jdbc:derby:meubanco;create=true";


    public static void init() {
        try (Connection conn = DriverManager.getConnection(URL)) {
            Statement stmt = conn.createStatement();
            stmt.execute("CREATE TABLE clientes (" +
                         "id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY," +
                         "nome VARCHAR(255)," +
                         "endereco VARCHAR(255)," +
                         "cpf VARCHAR(20)," +
                         "status_assinatura VARCHAR(20)," +
                         "status_ativo VARCHAR(20)" +
                         ")");
        } catch (SQLException e) {
            // Handle exception (e.g., table already exists)
        }
    }
}
