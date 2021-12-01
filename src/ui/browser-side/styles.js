const generarInformeCaja = document.getElementById("btnGenerarInformeCaja");
generarInformeCaja.addEventListener("click", async (e) => {
  const contenido = await CajaQuerys.getCaja();
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  });
  doc.autoTable({ html: '#cabeceraCaja' });
  doc.save("Caja.pdf");
  
  notifier.notify({
    title: 'Siglo 21',
    message: 'Pdf creado!'
  });
});