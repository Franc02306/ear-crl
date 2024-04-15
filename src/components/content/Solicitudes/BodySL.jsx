import React, { useContext, useEffect, useState } from "react";
import HeaderSL from "./HeaderSL";
import Solicitudes from "./Solicitudes";
import { useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import Filtrado from "./Componentes/subcomponentes/Filtrado";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppContext } from "../../../App";
import { obtenerEstados } from "../../../services/axios.service";

export function BodySL({ responsiveSizeMobile }) {
  const [estados, setEstados] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const { usuario, ruta } = useContext(AppContext);
  console.log("pintando")
  console.log(usuario)

  const navigate = useNavigate();

  const esSolicitudes = location.pathname.includes("solicitudes");

  const now = new Date();

  const [filtrado, setFiltrado] = useState({
    rangoFecha: [new Date(now.getFullYear(), 0, 1), new Date()],
    nrRendicion: null,
    estados:
      /*usuario.TipoUsuario == 2 ? [estados[1]] :*/ usuario.TipoUsuario == 1
        ? [
            {
              Id: 1,
              Nombre: "Borrador",
              Descripcion: null,
              id: null,
              name: null,
            },
            {
              Id: 5,
              Nombre: "Rechazado SR",
              Descripcion: null,
              id: null,
              name: null,
            },
            {
              Id: 7,
              Nombre: "Error Mig SR",
              Descripcion: null,
              id: null,
              name: null,
            },
          ]
        : usuario.TipoUsuario == 2
        ? [
            {
              Id: 2,
              Nombre: "Pendiente",
              Descripcion: null,
              id: null,
              name: null,
            },
            {
              Id: 3,
              Nombre: "En Autorización SR",
              Descripcion: null,
              id: null,
              name: null,
            },
          ]
        : usuario.TipoUsuario == 4
        ? [
            {
              Id: 7,
              Nombre: "Error Mig SR",
              Descripcion: null,
              id: null,
              name: null,
            },
          ]
        : null,
    empleadoAsig: null,
  });

  /* Obtiene Estados */
  async function obtenerEstadosLocal() {
    let response = await obtenerEstados("<8" /*esSolicitudes ? "<8" : ">7"*/);
    let body = response.data.Result;

    /*
    if (filtrado.estados == null && usuario.TipoUsuario == 2) {
      setFiltrado((...prevFiltrado) => ({
        ...prevFiltrado,
        estados: [body[1], body[2]], // Pendiente y En Autorización SR (Autorizador)
      }));
    } else if (filtrado.estados == null && usuario.TipoUsuario == 1) {
      setFiltrado((...prevFiltrado) => ({
        ...prevFiltrado,
        estados: [body[0], body[4], body[6]], // Borrador y En Autorización SR (Usuario)
      }));
    }
    */
    setEstados(response.data.Result);
  }
  /*----------------------------- */

  const exportExcel = async () => {
    const XLSX = await import("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(solicitudes);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAsExcelFile(excelBuffer, "solicitudes");
  };

  const saveAsExcelFile = async (buffer, fileName) => {
    const FileSaver = await import("file-saver");

    if (FileSaver && FileSaver.default) {
      const EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], { type: EXCEL_TYPE });

      FileSaver.default.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    }
  };

  async function changeEstadosValida() {
    obtenerEstadosLocal();
    // if (estados?.length > 0) {
    //   if (filtrado.estados == null && usuario.TipoUsuario == 2) {
    //     console.log("useEffect filtrado 2", estados);
    //     setFiltrado((...prevFiltrado) => ({
    //       ...prevFiltrado,
    //       estados: [estados[1], estados[2]],
    //     }));
    //   }
    // }
  }

  useEffect(() => {
    changeEstadosValida();
  }, []);

  // Header //
  const header = (
    <>
      <div className="flex justify-content-between flex-wrap">
        <div
          className={`flex ${
            responsiveSizeMobile ? `text-xl` : `text-2xl`
          } align-items-center`}
          // className={`flex  text-2xl align-items-center`}
        >
          Lista de Solicitudes
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <Button
            icon="pi pi-refresh"
            onClick={() => {
              setFiltrado((prevFiltrado) => ({
                ...prevFiltrado,
              }));
            }}
            severity="secondary"
          />
          <Button
            icon="pi pi-eraser"
            onClick={() => {
              setFiltrado({
                rangoFecha: [new Date(now.getFullYear(), 0, 1), new Date()],
                nrRendicion: null,
                estados: null,
              });
            }}
            severity="secondary"
          />
          <Button
            label="Agregar"
            icon="pi pi-plus"
            severity="success"
            onClick={() => {
              navigate(ruta + "/solicitudes/agregar");
            }}
            // disabled={(usuario.rol.id != 1)}
          />
          <Button
            label="Exportar"
            icon="pi pi-upload"
            severity="secondary"
            style={{ backgroundColor: "black" }}
            onClick={() => {
              exportExcel();
            }}
          />
        </div>
      </div>
      <Divider />
      <Filtrado
        estados={estados}
        setEstados={setEstados}
        filtrado={filtrado}
        setFiltrado={setFiltrado}
      />
    </>
  );

  return (
    <>
      <div className="card">
        <HeaderSL
          estados={estados}
          setEstados={setEstados}
          filtrado={filtrado}
          setFiltrado={setFiltrado}
          header={header}
        />
        <Solicitudes
          responsiveSizeMobile={responsiveSizeMobile}
          header={header}
          estados={estados}
          setEstados={setEstados}
          filtrado={filtrado}
          setFiltrado={setFiltrado}
          solicitudes={solicitudes}
          setSolicitudes={setSolicitudes}
        />
      </div>
    </>
  );
}
