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
            fontFamily: {
                'sans': ['Figtree'],
                'mono': ['JetBrains Mono'],
            }
        }
    }
    </script>
</head>
<?php
    $openlogin = false;
    if(isset($_POST['login_email']) && isset($_POST['login_password'])){
        include 'php/login.php';
        $openlogin = true;
    } else if (isset($_POST['register_firstName']) && isset($_POST['register_lastName']) && isset($_POST['register_username']) && isset($_POST['register_email']) && isset($_POST['register_password'])){
        include 'php/register.php';
    }
?>

<body class="bg-neutral-100 h-screen w-screen font-sans text-neutral-900 font-medium">
    <div class="w-screen h-screen flex justify-center items-center flex-col gap-6">
        <h1 class="text-9xl transition-all">_Welcome<p class="text-orange-600 text-right text-base leading-none">JavaScript v1.0</p></h1>
        
        <form id="loginForm" action="index.php" method="post"
            class=" <?php echo $openlogin?"flex":"hidden";?> flex-col items-center justify-center gap-2">
            <div class="w-80 flex flex-col">
                <input type="text" name="login_email" id="login_email"
                    class="w-full h-12 bg-neutral-100 border-2 border-b border-neutral-300 rounded-t-2xl px-4 text-lg"
                    placeholder="username or email">
                <input type="password" name="login_password" id="login_password"
                    class="w-full h-12 bg-neutral-100 border-2 border-t border-neutral-300 rounded-b-2xl px-4 text-lg"
                    placeholder="password">
                <div class="flex items-center gap-2 justify-end mt-3">
                    <input type="checkbox" name="remember" id="remember" class="w-5 h-5 peer">
                    <label for="remember" class="peer text-neutral-900">remember me</label>
                </div>
            </div>
        </form>
        <form id="registerForm" action="index.php" method="post"
            class="hidden flex-col items-center justify-center gap-2">
            <div class="w-80 gap-0 flex flex-col">
                <div class="flex gap-0 mb-2">
                    <input type="text" name="register_firstName" id="firstName"
                        class="w-full h-12 bg-neutral-100 border-2 border-r border-neutral-300 rounded-l-xl px-4 text-lg"
                        placeholder="first name">
                    <input type="text" name="register_lastName" id="lastName"
                        class="w-full h-12 bg-neutral-100 border-2 border-l border-neutral-300 rounded-r-xl px-4 text-lg"
                        placeholder="last name">
                </div>
                <input type="text" name="register_username" id="username"
                    class="w-full h-12 bg-neutral-100 border-2 border-neutral-300 rounded-xl px-4 text-lg mb-2"
                    placeholder="username">
                <p id="emailErrorMessage" class="text-orange-600"></p>
                <input type="email" name="register_email" id="register_email"
                    class="w-full h-12 bg-neutral-100 border-2 border-neutral-300 rounded-xl px-4 text-lg mb-2"
                    placeholder="email">
                <p id="passwordErrorMessage" class="text-orange-600"></p>
                <input type="password" name="register_password" id="register_password"
                    class="w-full h-12 bg-neutral-100 border-2 border-b border-neutral-300 rounded-t-xl px-4 text-lg"
                    placeholder="password">
                <input type="password" name="password" id="repeat_password"
                    class="w-full h-12 bg-neutral-100 border-2 border-t border-neutral-300 rounded-b-xl px-4 text-lg"
                    placeholder="confirm password">
            </div>
        </form>
        <div class="flex justify-center items-center gap-4 w-80">
            <div id="registerButton"
                class="w-full h-12 bg-neutral-900 hover:bg-neutral-800 transition-all flex justify-center items-center border-2 border-neutral-900 rounded-2xl select-none cursor-pointer drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <p class="text-center text-neutral-100">register</p>
            </div>
            <div id="loginButton"
                class="w-full h-12 bg-orange-600 flex justify-center items-center border-2 border-orange-600 hover:bg-neutral-100 rounded-2xl group transition-all select-none cursor-pointer drop-shadow-[0px_2px_10px_rgb(0,0,0,0.2)]">
                <p class="text-center text-orange-100 group-hover:text-orange-700">log in</p>
            </div>
        </div>
    </div>

    <div id="bottomText" class="fixed bottom-2 w-screen text-center font-mono text-xs">
        <p>This project is deigned and developed by Franko Zarkovic for Algebra University College.</p>
    </div>
</body>
<script src="./js/animatedBackground.js"></script>
<script src="./js/index.js"></script>

</html>