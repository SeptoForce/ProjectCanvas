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
    $userid = $_SESSION['userid'];
    $username = $_SESSION['username'];
    $connection = mysqli_connect("localhost", "root", "", "projectcanvas");
    $userQuerry = "SELECT * FROM users WHERE id = $userid";
    $user = mysqli_query($connection, $userQuerry);
    $user = mysqli_fetch_assoc($user);
    $currency = $user['currency'];
    $value = $user['value'];
    $currency = number_format($currency);
    $value = number_format($value);
    mysqli_close($connection);
?>
<body class="bg-neutral-100 h-screen w-screen font-sans text-neutral-900 font-medium">   
    <div class="w-screen h-screen flex justify-center items-center flex-col gap-5">
        <h1 class="text-6xl font-semibold transition-all">Welcome_ <?php echo $firstName ?></h1>
        <a href="evaluation.php" class="hover:scale-105 flex justify-between items-center group p-6 w-96 h-16 transition-all bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
            <p class="text-white font-semibold text-2xl transition-all">Coins available</p>
            <p class="text-white font-black text-5xl transition-all -translate-y-[2px]">+</p>
        </a>
        <div class="hover:scale-105 grid grid-cols-3 grid-rows-2 p-6 w-96 h-80 transition-all bg-neutral-50 rounded-xl hover:rounded-2xl drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
            <a href="creation.php" class="hover:scale-110 transition-all flex flex-col gap-1 justify-center items-center group drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <div class="bg-gradient-to-b from-orange-500 to-orange-700 w-20 h-20 transition-all rounded-xl flex items-center justify-center">
                    <h1 class="text-6xl transition-all font-black text-white relative top-[-2px]">+</h1>
                </div>
                <p class="text-sm transition-all font-mono">[_Canvas]</p>
            </a>
            <a href="finder.php" class="hover:scale-110 transition-all flex flex-col gap-1 justify-center items-center group drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <div class="bg-gradient-to-b from-blue-500 to-blue-700 w-20 h-20 transition-all rounded-xl flex items-center justify-center">
                    <h1 class="text-6xl transition-all font-black text-white relative top-[-0px]">F</h1>
                </div>
                <p class="text-sm transition-all font-mono">[_Find]</p>
            </a>
            <a <?php echo "href=collections.php?username=".$username ?> class="hover:scale-110 transition-all flex flex-col gap-1 justify-center items-center group drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <div class="bg-gradient-to-b from-red-500 to-red-700 w-20 h-20 transition-all rounded-xl flex items-center justify-center">
                    <h1 class="text-6xl transition-all font-black text-white relative top-[-0px]">C</h1>
                </div>
                <p class="text-sm transition-all font-mono">[_Collection]</p>
            </a>
            <a href="rankings.php" class="hover:scale-110 transition-all flex flex-col gap-1 justify-center items-center group drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <div class="bg-gradient-to-b from-purple-500 to-purple-700 w-20 h-20 transition-all rounded-xl flex items-center justify-center">
                    <h1 class="text-6xl transition-all font-black text-white relative top-[-0px]">#</h1>
                </div>
                <p class="text-sm transition-all font-mono">[_Rankings]</p>
            </a>
            <a href="profile.php" class="hover:scale-110 transition-all flex flex-col gap-1 justify-center items-center group drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <div class="bg-gradient-to-b from-neutral-500 to-neutral-700 w-20 h-20 transition-all rounded-xl flex items-center justify-center">
                    <h1 class="text-6xl transition-all font-black text-white relative top-[-0px]">P</h1>
                </div>
                <p class="text-sm transition-all font-mono">[_Profile]</p>
            </a>
        </div>
        <div class="w-96 flex justify-between">
            <div class="flex gap-2">
                <div class="min-w-[5rem] px-4 h-8 bg-neutral-900/75 group transition-all rounded-xl flex justify-center items-center drop-shadow-[0px_2px_10px_rgb(0,0,0,0.1)]">
                    <p class="text-white transition-all text-sm select-none">C <?php echo $currency;?></p>
                </div>
                <div class="min-w-[5rem] px-4 h-8 bg-neutral-900/75 group transition-all rounded-xl flex justify-center items-center drop-shadow-[0px_2px_10px_rgb(0,0,0,0.1)]">
                    <p class="text-white transition-all text-sm select-none">V <?php echo $value;?></p>
                </div>
            </div>
            <a href="../index.php" class="w-20 h-8 bg-neutral-50 group hover:bg-orange-600 transition-all rounded-xl flex justify-center items-center drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <p class="text-orange-600 group-hover:text-white transition-all text-sm">log out</p>
            </a>
        </div>
    </div>

    
    
    <div id="bottomText" class="fixed bottom-2 w-screen text-center font-mono text-xs">
        <p>This project is deigned and developed by Franko Zarkovic for Algebra University College.</p>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.3.js" integrity="sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=" crossorigin="anonymous"></script>
<script src="../jQ/animatedBackground.js"></script>
<script src="../jQ/home.js"></script>
</html>