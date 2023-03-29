<?php 
  include("con_db.php");  
  $usuarios = "SELECT  * FROM clientes";
  $resultado = mysqli_query($conex,$usuarios);
  while($row = mysqli_fetch_assoc($resultado)) {
  ?>
    <tr>
      <th scope="row"> <?php echo $row["id"] ?> </th>
      <td> <?php echo $row["nombre"] ?> </td>
      <td> <?php echo $row["telefono"] ?> </td>
      <td> <?php echo $row["fecha_reg"] ?> </td>
    </tr>

    <?php } mysqli_free_result ($resultado); 
    
    ?>



    