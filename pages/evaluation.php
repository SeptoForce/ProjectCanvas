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
<body class="bg-purple-700 h-screen w-screen font-sans text-neutral-100 font-medium">
    <div class="w-screen h-screen flex justify-center items-center flex-col drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
        <h1 class="text-6xl font-semibold transition-all mb-4">_SELECT _MORE VALUABLE_</h1>
        <div class="flex w-screen h-[26rem] justify-center items-center gap-4 mb-3">
            <div id="canvas1" class="w-72 h-96 transition-all hover:scale-105 bg-neutral-900 rounded-xl grid grid-cols-6 p-3 place-items-center cursor-pointer select-none">
                <script>
                    for (let i = 0; i < (8*6); i++) {
                        let cell = "<div class='w-10 h-10 bg-neutral-100 rounded-[0.3rem]'></div>";
                        document.writeln(cell);
                    }
                </script>
            </div>
            <div id="canvas2" class="w-72 h-96 transition-all hover:scale-105 bg-neutral-900 rounded-xl grid grid-cols-6 p-3 place-items-center cursor-pointer select-none">
                <script>
                    for (let i = 0; i < (8*6); i++) {
                        let cell = "<div class='w-10 h-10 bg-neutral-100 rounded-[0.3rem]'></div>";
                        document.writeln(cell);
                    }
                </script>
            </div>
        </div>
        <div class="flex gap-1 items-center justify-center">
            <p class="text-2xl font-semibold transition-all mb-4">_current reward</p>
            <p id="rewardAmount" class="text-xl font-semibold transition-all mb-4 bg-neutral-900/75 p-1 px-3 rounded-xl">C 0</p>
        </div>
        <div id="backButton" class="p-1 px-4 rounded-xl bg-neutral-100 hover:bg-orange-600 text-orange-600 select-none cursor-pointer transition-all hover:text-white font-semibold"><p>go back</p></div>
    </div>

    <div id="bottomText" class="fixed bottom-0 py-1 bg-black text-neutral-500 w-screen text-center font-mono text-xs">
        <p>This project is deigned and developed by Franko Zarkovic for Algebra University College.</p>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
<script src="../jQ/animatedBackground.js"></script>
<script src="../jQ/evaluation.js"></script>
</html>