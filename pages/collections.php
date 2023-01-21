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
    $username = $_GET['username'];
    $connection = mysqli_connect("localhost", "root", "", "projectcanvas");
    $userData = mysqli_query($connection, "SELECT * FROM users WHERE username = '$username'");
    $userData = mysqli_fetch_assoc($userData);
    mysqli_close($connection);
?>
<body class="bg-neutral-100 h-screen w-screen font-sans text-neutral-900 font-medium">   
    <div class="h-screen flex justify-center items-center flex-col gap-4 drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
        <div class="flex items-center justify-center px-8 flex-col h-24 transition-all bg-neutral-50 rounded-xl">
            <h1 class="text-3xl leading-none"><?php echo $userData["firstname"]." ".$userData["lastname"]?></h1>
            <p class="text-xl leading-none text-orange-600"><?php echo "@".$userData["username"]?><p>
        </div>
        <div class="w-[35rem] h-[30rem] transition-all bg-neutral-50 rounded-xl hover:rounded-2xl overflow-hidden">
            <div class="bg-neutral-900/90 h-8 w-full flex justify-center items-center">
                <p class="text-xl leading-none text-neutral-50">V <?php echo number_format($userData["value"])?></p>
            </div>
            <div class="h-full p-4 pt-0 pb-16 flex items-center justify-center">
                <div id="canvasShowcase" class="w-full h-full bg-neutral-200 rounded-b-xl shadow-[inset_0px_2px_15px_rgb(0,0,0,0.2)] p-4 flex justify-center flex-wrap gap-4 gap-y-5 overflow-y-scroll">
                    
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
<script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
<script src="../jQ/animatedBackground.js"></script>
<script src="../jQ/collections.js"></script>
</html>