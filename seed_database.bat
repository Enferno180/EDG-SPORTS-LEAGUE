@echo off
echo ==========================================
echo        SEEDING DATABASE
echo ==========================================
echo.
echo Note: The server (start_server.bat) MUST be running first!
echo.
echo Sending request to seed database...
curl http://localhost:3000/api/seed-db
echo.
echo.
echo ==========================================
echo   DONE!
echo   Login: admin@edg.com
echo   Pass:  123
echo ==========================================
pause
