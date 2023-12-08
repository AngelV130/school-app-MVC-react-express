import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import classNames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  MagnifyingGlassIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronUpDownIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,

} from '@heroicons/react/24/solid'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const DebouncedInput = ({ value: keyWord, onChange, ...props }) => {
  const [value, setValue] = useState(keyWord);
  // console.log(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Filterd');
      onChange(value);
    }, 500)
    console.clear()
    return () => clearTimeout(timeout);
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

const DataTable = React.memo(() => {
  const [statModificar,setStatModificar] = useState(false)
  const refCalificaiones = useRef([])
  const focusCalificaiones = useRef()
  const [refCalificaion,setRefCalificaion] = useState([])
  const [data, setData] = useState([])
  const {id} = useParams()
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  console.log(globalFilter);
  const obtenerData =  async () =>{
    try {
      const res = await fetch("http://localhost:3000/api/calificaciones/"+id,{method:"GET",
      headers:{
        'Content-Type': 'application/json',
        }})
      const result = await res.json()
      setData(result.data)
      console.log(result)
      console.log("result")
    } catch (error) {
        
    }
  }

  const guardarCalificaciones =  async () =>{
    console.log(refCalificaiones,refCalificaiones.length)
    if (refCalificaiones == null || refCalificaiones.length == 0){
      console.log("No hay data")
      return 
    }
    try {
      const res = await fetch("http://localhost:3000/api/calificaciones/"+id,{method:"POST",
      body:{
        data:JSON.stringify(refCalificaiones)
      },
      headers:{
        'Content-Type': 'application/json',
        }})
      const result = await res.json()
      setData(result.data)
      console.log(result)
      console.log("result")
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    obtenerData()
  },[])

  const columns = [
    {
      // accessorKey: 'name',
      accessorKey: 'NombreAlumno',
      header: () => <span>Nombre</span>,
      cell: info => <span className='font-bold'>{info.getValue()}</span>
    },
    {
      accessorKey: 'NombreCurso',
      // accessorKey: 'lastName',
      header: () => <span>Curso</span>
    },
    {
      accessorKey: 'status',
      header: () => <span>Estado</span>,
      cell: info => {
        return (
          <span className='bg-green-500'>
            Activo
          </span>
        )
      },
      enableSorting: true
    },
    {
      accessorKey: 'CalificacionAlumno',
      header: 'Calificacion',
      cell: info => {
        console.log(info.row.original.IdUsers)
        if(!statModificar){
          // const indiceElemento = refCalificaion.findIndex(item => item.IdAlumno === info.row.original.IdUsers);
          // if (indiceElemento !== -1) {
          //   // El elemento con el id existe, modificarlo
          //   refCalificaion[indiceElemento].Calificacion = info.getValue();
          // } else {
          //   // El elemento con el id no existe, agregarlo
          //   const nuevoElemento = { IdAlumno: info.row.original.IdUsers, Calificacion: info.getValue() };
          //   refCalificaion.push(nuevoElemento)
          // }
          return <span className='font-bold'>{info.getValue()}</span>

        }
        // setRefCalificaion(info.getValue())
        // const elementoEncontrado = refCalificaion.find(item => item.IdAlumno === info.row.original.IdUsers);
        let val = 1
        // if(elementoEncontrado == undefined){
        //   refCalificaiones.current.value = info.getValue();
        //   val = refCalificaiones.current.value
        // }else{
        //   val = elementoEncontrado.Calificacion
        // }
        return <span className='font-bold'><input value={val}
            // onChange={(e)=>{
            //   // console.log(e.target.i``)
            //   // focusCalificaiones.current = e.target

            //   setTimeout(()=>{
            //     console.log("Focus")
            //     e.target.focus()
            //   },10000)
            //   const indiceElemento = refCalificaion.findIndex(item => item.IdAlumno === info.row.original.IdUsers);

            //   if (indiceElemento !== -1) {
            //     // El elemento con el id existe, modificarlo
            //     const nuevosDatos = [...refCalificaion];
            //     nuevosDatos[indiceElemento].Calificacion = e.target.value;
            //     setRefCalificaion(nuevosDatos);
            //   } else {
            //     // El elemento con el id no existe, agregarlo
            //     const nuevoElemento = { IdAlumno: info.row.original.IdUsers, Calificacion: e.target.value };
            //     setRefCalificaion(prevDatos => [...prevDatos, nuevoElemento]);
            //   }
            // }}
            type="text" className='w-full bg-transparent border p-2 text-center' /></span>
      },
      enableSorting: false
    }
  ]

  const getStateTable = () => {
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const rowsPerPage = table.getRowModel().rows.length;

    const firstIndex = (pageIndex * pageSize) + 1;
    const lastIndex = (pageIndex * pageSize) + rowsPerPage;

    return {
      totalRows,
      firstIndex,
      lastIndex
    }
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting
  })

  return (
    <div className='px-6 py-4'>

      <div className='m-0 p-3 pl-5 flex justify-between' style={{'background-color': '#2f383d'}}>
		<h1 className='text-white text-3xl'>Calificaciones</h1>
        <div className='flex relative'>
          <DebouncedInput
            type="text"
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            className='px-6 py-2 text-gray-600 border border-gray-300 rounded outline-indigo-700'
            placeholder='Buscar...'
          />
          {
            !statModificar ? 
              <button onClick={(e)=>{
                setStatModificar(true)
              }} className="mr-1 ml-1 flex items-center bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-yellow flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              Modificar
            </button>
            :
            <button onClick={(e)=>{
                guardarCalificaciones()
                setStatModificar(false)
              }} className="mr-1 ml-1 flex items-center bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-yellow flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
              </svg>
              Guardar
            </button>
          }
          {/* <MagnifyingGlassIcon className='w-5 h-5 absolute top-3 left-1' /> */}
            <button onClick={(e)=>{
              window.open("http://localhost:3000/api/generar-pdf/"+id, '_blank');
            }} className="ml-1 flex items-center bg-yellow-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-yellow flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            PDF
          </button>
        </div>
      </div>
      <div className='overflow-auto'>
        <table className='table-auto w-full min-w-[560px]'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-gray-300 text-gray-600 bg-gray-100" >
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="py-2 px-4 text-left uppercase">
                    {header.isPlaceholder
                      ? null
                      :
                      <div
                        className={classNames({
                          'cursor-pointer select-none flex justify-between': header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <BarsArrowUpIcon className='w-5 h-5' />,
                          desc: <BarsArrowDownIcon className='w-5 h-5' />
                        }[header.column.getIsSorted()] ?? (header.column.getCanSort() ? <ChevronUpDownIcon className='w-5 h-5' /> : null)}
                      </div>
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody style={{'background-color': '#2f383d'}}>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="text-white hover:bg-slate-100" >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-2 px-4" >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-0 md:flex items-center justify-between space-y-4 text-center bg-white px-2 pb-2'>
        <div className='flex items-center gap-2'>
          <button
            className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <ChevronDoubleLeftIcon className='w-5 h-5' />
          </button>
          <button
            className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ChevronLeftIcon className='w-5 h-5' />
          </button>

          {table.getPageOptions().map((value, key) => (
            <button key={key}
              className={classNames({
                "text-gray-600 bg-gray-200 py-0.5 px-2 font-bold rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300": true,
                "bg-indigo-200 text-indigo-700": value === table.getState().pagination.pageIndex
              })}
              onClick={() => table.setPageIndex(value)}>
              {value + 1}
            </button>
          ))}

          <button
            className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <ChevronRightIcon className='w-5 h-5' />
          </button>
          <button
            className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <ChevronDoubleRightIcon className='w-5 h-5' />
          </button>
        </div>
        <div className='text-gray-600 font-semibold'>
          Mostrando de {getStateTable().firstIndex}&nbsp;
          a {getStateTable().lastIndex}&nbsp;
          del total de {getStateTable().totalRows} registros
        </div>
        <select
          className='text-gray-600 border border-gray-300 rounded outline-indigo-700 py-2'
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}>
          <option value="5">5 pág.</option>
          <option value="10">10 pág.</option>
          <option value="20">20 pág.</option>
          <option value="25">25 pág.</option>
          <option value="50">50 pág.</option>
        </select>
      </div>
    </div>
  )
})

export default DataTable