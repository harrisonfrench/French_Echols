package main

import (
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"time"
)

func main() {
	dsn := "echolsfrench:devpassword@tcp(127.0.0.1:3306)/echolsfrench?parseTime=true&charset=utf8mb4"
	
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		fmt.Printf("Error opening: %v\n", err)
		return
	}
	defer db.Close()
	
	db.SetConnMaxLifetime(5 * time.Minute)
	
	if err := db.Ping(); err != nil {
		fmt.Printf("Error pinging: %v\n", err)
		return
	}
	
	fmt.Println("Connected successfully!")
}
