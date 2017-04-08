#!/usr/bin/env bash

path=`cat .current`

echo -e "\n\nHacker Rank $path\n"

exec="$path/main.js"
chmod +x "$exec"

input_id=${1:-"00"}
input_path="$path/input/input$input_id.txt"
input=`cat $input_path`
output_path="$path/output/output$input_id.txt"
output=`cat $output_path`

echo "++++++++++++++++++++++++++++++++++++++++++++"
echo "INPUT $input_id: ($input_path)"
echo "$input"
echo "++++++++++++++++++++++++++++++++++++++++++++"
echo "EXEC…"
SECONDS=0
$exec 0< $input_path
echo "${SECONDS}s elapsed..."
echo -e "\n++++++++++++++++++++++++++++++++++++++++++++"
echo "EXPECTED OUTPUT: ($output_path)"
echo "$output"
echo "++++++++++++++++++++++++++++++++++++++++++++"
