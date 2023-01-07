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
                    'sans': ['Figtree'],
                    'mono': ['JetBrains Mono'],
                }
            }
        }
  </script>
</head>
<body class="bg-neutral-100 h-screen w-screen font-sans text-neutral-900 font-medium">
    <div class="h-screen flex justify-center items-center flex-col gap-4 drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
        <div class="w-[50rem] h-[50rem] transition-all bg-neutral-50 rounded-3xl overflow-hidden">
            <div id="filters" class="h-16 flex gap-1 w-full justify-center items-center">
                <div class="border-orange-600 border-2 border-r -mr-0.5 px-4 py-1 text-sm rounded-l-full bg-orange-600 text-white cursor-pointer select-none">Sort By Value ↓</div>
                <div class="border-orange-600 border-2 border-l -ml-0.5 px-4 py-1 mr-1 text-sm rounded-r-full text-orange-600 cursor-pointer select-none">Sort By Date ↓</div>
                <input type="" name="maxValue" id="maxValue" placeholder="MAX VALUE" class="text-sm h-8 border-orange-600 border-2 border-r -mr-0.5 rounded-l-full w-24 text-center">
                <input name="minValue" id="minValue" placeholder="MIN VALUE" class="text-sm h-8 border-orange-600 border-2 border-l -ml-0.5 rounded-r-full w-24 text-center mr-1">
                <div class="h-8 w-8 mx-2 flex justify-center items-center text-base">Color:</div>
                <div id="filter_neutral" class="border-neutral-500 border-4 h-7 w-7 text-sm rounded-full cursor-pointer select-none"></div>
                <div id="filter_red" class="border-red-500 border-4 h-7 w-7 text-sm rounded-full cursor-pointer select-none"></div>
                <div id="filter_orange" class="border-orange-500 border-4 h-7 w-7 text-sm rounded-full cursor-pointer select-none"></div>
                <div id="filter_green" class="border-green-500 border-4 h-7 w-7 text-sm rounded-full cursor-pointer select-none"></div>
                <div id="filter_cyan" class="border-cyan-500 border-4 h-7 w-7 text-sm rounded-full cursor-pointer select-none"></div>
                <div id="filter_blue" class="border-blue-500 border-4 h-7 w-7 text-sm rounded-full cursor-pointer select-none"></div>
                <div id="filter_fuchsia" class="border-fuchsia-500 border-4 h-7 w-7 text-sm rounded-full cursor-pointer select-none"></div>
            </div>
            <div class="h-[46rem] p-4 pt-0 flex items-center justify-center">
                <div id="canvasShowcase" class="w-full h-full bg-neutral-200 rounded-xl shadow-[inset_0px_2px_15px_rgb(0,0,0,0.2)] border p-4 flex justify-center flex-wrap gap-4 gap-y-5 overflow-y-scroll">
                    
                </div>
            </div>
        </div>
        <div class="w-96 flex justify-center">
            <div id="backButton" class="p-1 px-4 rounded-xl bg-neutral-50 hover:bg-orange-600 text-orange-600 select-none cursor-pointer transition-all hover:text-white font-semibold">go back</div>
        </div>
    </div>

    
    
    <div id="bottomText" class="fixed bottom-2 w-screen text-center font-mono text-xs">
        <p>This project is deigned and developed by Franko Zarkovic for Algebra University College.</p>
    </div>
</body>
<script src="../js/animatedBackground.js"></script>
<script src="../js/finder.js"></script>
</html>