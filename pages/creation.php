<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project</title>
    <script src="http://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                fontFamily:{
                    'sans': ['Figtree']
                }
            }
        }
  </script>
</head>
<?php
    session_start();
    $firstName = $_SESSION['firstName'];
    $currency = $_SESSION['currency'];
    $value = $_SESSION['value'];
    $currencyString = number_format($currency);
    $valueString = number_format($value);
?>
<body class="bg-neutral-100 h-screen w-screen font-sans text-neutral-900 font-medium">   
    <div class="min-w-screen min-h-screen flex justify-center items-center flex-col gap-3">
        <div class="md:max-w-[49rem] max-w-sm w-full h-8 flex justify-between">
            <a href="home.php" class="h-8 group transition-all rounded-xl flex justify-center items-center drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <p class="text-orange-600 transition-all font-semibold text-xl select-none">〈 _Home</p>
            </a>
            <div class="min-w-[5rem] px-4 h-8 bg-neutral-900/75 group rounded-xl flex justify-center items-center drop-shadow-[0px_2px_10px_rgb(0,0,0,0.1)]">
                <p id="user_wallet" class="text-white text-sm select-none">C X</p>
            </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col gap-4">
                <div id="canvas_colorPicker" class="grid grid-rows-3 grid-flow-col gap-1 p-6 transition-all bg-neutral-50 rounded-xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                    <script> // This is a script that generates the color picker
                        for (let i = 0; i < 7; i++) {
                            let colors = ["neutral","red","yellow","green","cyan","blue","fuchsia"];
                            for (let j = 0; j < 3; j++) {
                                let text = `<div class='bg-${colors[i%7]}-${((j%3)*200)+300} w-11 h-11 rounded-md cursor-pointer select-none'></div>`;
                                document.writeln(text);
                            }
                        }
                    </script>
                </div>
                <div class="w-96 px-8 p-6 transition-all bg-neutral-50 rounded-xl hover:rounded-2xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                    <div id="canvas_canvas" class="bg-neutral-800 grid grid-cols-6 p-2 gap-0.5 place-items-center transition-all rounded-lg">
                        <script> // This is a script that generates the canvas
                            for (let i = 0; i < (8*6); i++) {
                                let text = "<div class='bg-neutral-300 w-12 h-12 rounded-md cursor-pointer select-none'></div>"
                                document.writeln(text);
                            }
                        </script>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between flex-col w-96 transition-all bg-neutral-50 rounded-xl hover:rounded-2xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <div class="flex flex-col items-center justify-center w-full p-6 pt-10">
                    <h1 id="canvas_canvasName" class="text-2xl border-b w-4/5 text-center py-5 font-semibold">Loading...</h1>
                    <input id="canvas_canvasNameField" type="text" class="text-xl border-b w-4/5 text-center py-5 mt-1 bg-transparent hidden font-semibold text-neutral-400" placeholder="ENTER NAME HERE">
                    <div class="text-xl border-b w-4/5 text-center py-5">
                        <p id="canvas_creationDate">XX. XX. 20XX.</p>
                    </div>
                    <div class="text-sm border-b text-center w-4/5 py-5">
                        <p>_ ORIGINAL CREATOR _</p>
                        <p id="canvas_originalCreator" class="text-2xl">-</p>
                        <p id="canvas_originalCreatorUsername" class="text-sm mb-5 text-orange-600 select-none cursor-pointer">-</p>
                        <p>_CURRENT OWNER_</p>
                        <p id="canvas_currentOwner" class="text-2xl">-</p>
                        <p id="canvas_currentOwnerUsername" class="text-sm text-orange-600 select-none cursor-pointer">-</p>
                    </div>
                    <div class="text-base border-b text-center w-4/5 py-5 flex justify-center items-center flex-col">
                        <p>_CURRENT VALUE_</p>
                        <div class="flex gap-1">
                            <p id="canvas_value" class="text-xl bg-orange-600 text-white rounded-xl py-1 px-8">NEW</p>
                            <p id="canvas_rank" class="text-xl bg-purple-600 text-white rounded-xl py-1 px-4 hidden items-center"># - </p>
                        </div>
                    </div>
                </div>
                <div class="text-base text-center w-4/5 py-8">
                    <div id="canvas_purchaseButton" class="select-none text-5xl text-white rounded-3xl p-3 flex flex-col items-center justify-center">
                        <p class="text-lg">PURCHASE FOR</p>
                        <p id="canvas_price" class="text-3xl rounded-xl py-1 px-3 mt-1 leading-none ring-2 ring-neutral-50">C 500</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    
    <div id="bottomText" class="fixed bottom-0 py-1 w-screen text-center font-mono text-xs bg-neutral-50">
        <p>This project is deigned and developed by Franko Zarkovic for Algebra University College.</p>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
<script src="../jQ/animatedBackground.js"></script>
<script src="../jQ/canvasDrawing.js"></script>
</html>