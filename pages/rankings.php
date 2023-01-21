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
<body class="bg-neutral-100 h-screen w-screen font-sans text-neutral-900 font-medium">   
    <div class="w-screen h-screen flex justify-center items-center flex-col gap-5 drop-shadow-[0px_2px_10px_rgb(0,0,0,0.1)]">
        <h1 class="text-6xl font-semibold transition-all">_Rankings</h1>
        <div class="w-96 min-h-[10rem] transition-all bg-neutral-50 rounded-2xl overflow-hidden">
            <div id="rankingsTable" class="w-full divide-y"></div>
        </div>
        <div class="w-96 flex justify-center">
            <a href="../pages/home.php" class="p-1 px-4 rounded-xl bg-neutral-50 hover:bg-orange-600 text-orange-600 select-none cursor-pointer transition-all hover:text-white font-semibold">go back</a>
        </div>
    </div>

    <div id="tooltip" class="bg-white border fixed top-0 rounded-md px-2 py-1">
        <div class="w-full h-full flex flex-col justify-center items-center">
            <p id="tooltipName" class="text-center text-base">John Snow</p>
        </div>
    </div>
    
    <div id="bottomText" class="fixed bottom-2 w-screen text-center font-mono text-xs">
        <p>This project is deigned and developed by Franko Zarkovic for Algebra University College.</p>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
<script src="../jQ/animatedBackground.js"></script>
<script src="../jQ/rankings.js"></script>
</html>