$(document).ready(function(){

    $("#btnCadastro").click(function(){
        let $user = $("#user").val();
        let $pwd = $("#pwd").val();
        let $data= {"user":$user,"pwd":$pwd}
        if($user && $pwd){

         let url= "http://localhost:8080/usuarios";
         axios.post(url,$data);
          alert("Usuario cadastrado com sucesso !");        

        }
        else{
            alert("Erro: favor informar o usuario e a senha")
        }

    });

});