import { Checkbox } from '@mui/material';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import { obtenerMotivos, obtenerProveedores, obtenerTipos } from '../../../../../../services/axios.service';
import { Calendar } from 'primereact/calendar';


function DocumentoSustentado() {

    const [productDialog, setProductDialog] = useState(false);
    const openNew = () => {
        setProductDialog(true);
    };

    const [selectedMoneda, setSelectedMoneda] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState(null);
    const [selectedMotivo, setSelectedMotivo] = useState(null);
    const [selectedProveedor, setSelectedProveedor] = useState(null);

    const [tipos, setTipos] = useState(null);
    const [motivos, setMotivos] = useState(null);
    const [proveedores, setProveedores] = useState(null);

    const articulos = [
        {
            "Cod": "00001",
            "Concepto": "Producto 1",
            "Almacen": "ALMACEN 01",
            "Proyecto": "PROYECTO 01",
            "UnidadNegocio": "UNIDAD DE NEGOCIO 01",
            "Filial": "FITAL 01",
            "Areas": "AREAS 01",
            "CentroCosto": "CENTRO COSTO 01",
            "IndImpuesto": "SI",
            "Precio": 100.00,
            "Cantidad": 10,
            "Impuesto": 10.00
        }
    ]

    async function obtenerData() {
        const response = await Promise.all([
            obtenerTipos(),
            obtenerMotivos(),
            obtenerProveedores()
        ]);
        setTipos(response[0].data.Result)
        setMotivos(response[1].data.Result)
        console.log(response[1].data.Result)
        console.log(response[2].data.Result)
        setProveedores(response[2].data.Result)
    }
    useEffect(() => {
        obtenerData();
    }, []);

    const monedas = [
        { id: 'SOL', name: 'SOL' },
        { id: 'USD', name: 'USD' },
    ];

    const [proveedor, handleChangeProveedor] = useState(null);

    const selectedOptionTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex">
                    <div>{option.LicTradNum}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const complementoOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center border-bottom-1 surface-border w-full">
                <div>
                    {option.LicTradNum} - {option.CardName}
                </div>
            </div>
        );
    };


    return (
        <div>
            <h1>Agregar Documento Sustentado:</h1>
            <div className="col-12 md:col-6 lg:col-12">
                <div className="mb-3 flex flex-column">
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)¿Es exterior?</label>
                        <Checkbox
                            className='col-6'
                        ></Checkbox>
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)Tipo</label>
                        <Dropdown
                            className='col-6'
                            value={selectedTipo}
                            onChange={
                                (e) => {
                                    setSelectedTipo(e.value);
                                    console.log(e.value)
                                }}
                            options={tipos}
                            optionLabel="name"
                            placeholder='Seleccione Tipo'
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)N° de serie</label>
                        <InputText
                            className='col-6'
                            placeholder='N° de serie'
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)Correlativo</label>
                        <InputText
                            className='col-6'
                            placeholder='Correlativo'
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)RUC</label>
                        <Dropdown
                            className='col-6'
                            value={proveedor}
                            onChange={(e) => handleChangeProveedor(e.value)}
                            options={proveedores}
                            optionLabel="LicTradNum"
                            filter
                            filterBy='LicTradNum'
                            filterMatchMode="contains"
                            placeholder="Selecciona Proveedor"
                            valueTemplate={selectedOptionTemplate}
                            itemTemplate={complementoOptionTemplate}
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)Razon Social</label>
                        <InputText
                            className='col-6'
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)Direccion</label>
                        <InputText
                            className='col-6'
                            placeholder='Direccion'
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)Motivo</label>
                        <Dropdown
                            className='col-6'
                            value={selectedMotivo}
                            onChange={(e) => {
                                setSelectedMotivo(e.value)
                                console.log(e.value)
                            }}
                            options={motivos}
                            optionLabel="name"
                            placeholder='Seleccione Motivo'
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)Moneda</label>
                        <Dropdown
                            className='col-6'
                            value={selectedMoneda}
                            onChange={(e) => {
                                setSelectedMoneda(e.value)
                            }}
                            options={monedas}
                            optionLabel="name"
                            placeholder='Seleccione Moneda'
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)Fecha</label>
                        <Calendar
                            className='col-6'
                            // value={}
                            // readOnlyInput
                            // disabled
                            placeholder='Seleccione fecha'
                            dateFormat="dd/mm/yy"
                        />
                    </div>
                    <div className="flex col-12 align-items-center gap-5">
                        <label className='col-2'>(*)Comentario</label>
                        <InputTextarea
                            className='col-6'
                            rows={5}
                            cols={30}
                        />
                    </div>
                    <div className="flex col-12">
                        <Button
                            className='col-6'
                            label="Agregar Detalle"
                            onClick={openNew}
                        />
                        <Button
                            className='col-6'
                            label="Eliminar Seleccionados"
                            onClick={openNew}
                        />
                    </div>
                    <DataTable
                        value={articulos}
                        sortMode="multiple"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        tableStyle={{ minWidth: "12rem" }}
                        header="Detalle de Documento Sustentado"
                    // loading={loading}
                    >
                        <Column
                            header="N°"
                            headerStyle={{ width: "3rem" }}
                        // body={(data, options) => options.rowIndex + 1}
                        >
                        </Column>
                        <Column
                            field="Cod"
                            header="Cod. Articulo/Servicio"
                            style={{ width: "3rem" }}
                            className="font-bold"
                        ></Column>
                        <Column
                            field="Concepto"
                            header="Concepto"
                            style={{ minWidth: "12rem" }}
                        ></Column>
                        <Column
                            field="Almacen"
                            header="Almacen"
                            style={{ minWidth: "8rem" }}
                        // body={statusBodyTemplate}
                        ></Column>
                        <Column
                            field="Proyecto"
                            header="Proyecto"
                            style={{ minWidth: "5rem" }}
                        ></Column>
                        <Column
                            field="UnidadNegocio"
                            header="Unidad de Negocio"
                            style={{ minWidth: "8rem" }}
                        ></Column>
                        <Column
                            field="Filial"
                            header="Filial"
                            style={{ minWidth: "10rem" }}
                        // body={fecBodyTemplate}
                        ></Column>
                        <Column
                            field="Areas"
                            // body={priceBodyTemplate}
                            header="Areas"
                            style={{ minWidth: "12rem" }}
                        ></Column>
                        <Column
                            field="CentroCosto"
                            header="Centro Costo"
                            style={{ minWidth: "10rem" }}
                        // body={fecBodyTemplate}
                        ></Column>
                        <Column
                            field="IndImpuesto"
                            header="Ind. Impuesto"
                            style={{ minWidth: "7rem" }}
                        ></Column>
                        <Column
                            field="Precio"
                            header="Precio"
                            style={{ minWidth: "7rem" }}
                        ></Column>
                        <Column
                            field="Cantidad"
                            header="Cantidad"
                            style={{ minWidth: "7rem" }}
                        ></Column>
                        <Column
                            field="Impuesto"
                            header="Impuesto"
                            style={{ minWidth: "7rem" }}
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default DocumentoSustentado;