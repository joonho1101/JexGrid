var batchInsYN = $("#BATCH_INS_YN").val();
var printYN    = $("#PRINT_YN").val();
var fileYN     = $("#FILE_YN").val();

/*********************************************************
 * web ȭ�鿡 ���� location ����
 *********************************************************/


document.write("	<!-- Ÿ��Ʋ -->");
document.write("	<div class='h1_cboth'>");
document.write("		<h1 class='f_left'></h1>"); 
document.write("		<div class='f_right'>");
document.write("			<div class='location'>");
//document.write("				<span class='location_btn'>");

/*********************************************************
 * web ȭ�鿡 ���� ��ư Ȱ��ȭ
 *********************************************************/
//�ϰ���� ��ư Ȱ��ȭ ����
if(batchInsYN == "Y"){
	//document.write("					<a href='#'><img src='img/comm/button/btn_register.gif' alt='�ϰ����' /></a>");
}
//�μ� ��ư Ȱ��ȭ ����
if(printYN == "Y"){
	//document.write("					<a href='#'><img src='img/comm/button/btn_print.gif' alt='�μ�' /></a>");
}
//�������� ��ư Ȱ��ȭ ����
if(fileYN == "Y" || fileYN == "y"){
	document.write("					<a href='#' jexgridbutton='rcomm_download' jexgridId='' type='button' ><img src='img/comm/button/btn_filesave.gif' alt='��������' /></a>");
}
/*********************************************************
 * web ȭ�鿡 ���� ��ư Ȱ��ȭ
 *********************************************************/
//document.write("				</span>");
document.write("			</div>");
document.write("		</div>");
document.write("	</div>");
document.write("	<!-- Ÿ��Ʋ  -->");

