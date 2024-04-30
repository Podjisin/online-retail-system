pushd "%~dp0" || exit /B
cd backend
start cmd.exe /k "npm i && npm run dev"
popd