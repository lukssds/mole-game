$(document).ready(function(){

    $("#btnLogin").click(function(){
        let $user = $("#user").val();
        let $pwd = $("#pwd").val();

        if($user && $pwd){

            $.getJSON( "http://localhost:8080/usuarios", function($registros) {

                const usr = $registros.find($usuario =>$usuario.user == $user && $usuario.pwd == $pwd);
                    if(usr){
                        localStorage.setItem('usuario', JSON.stringify(usr));
                        window.open("index.html","_self");
                    }
                    else{
                        alert("usuario invalido Tente novamente");
                    }
                
                });

        }
        else{
            alert("Erro: favor informar o usuario e a senha")
        }

    });

});
