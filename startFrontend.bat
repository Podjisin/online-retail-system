pushd "%~dp0" || exit /B
cd frontend
cd ors-staffapp
start cmd.exe /k "npm i && npm run dev"
popd