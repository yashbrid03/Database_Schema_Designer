import React, { useEffect } from "react";
import { useState } from "react";
import FieldModal from "./FieldModal";
import TableData from "./TableData";
import { Handle, Position } from "@xyflow/react";
import { setFieldState} from "../store/tablesSlice"
import { useDispatch } from "react-redux";

export const CustomNode = ({ data }) => {
  const [fields, setFields] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editKey, setEditKey] = useState(null);
  const [initialFieldData, setInitialFieldData] = useState({
    key: "",
    value: "",
  });
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setFieldState({tableName: data.label, fieldData:fields}))
  },[fields])
  
  // useEffect(()=>{
  //   console.log(fields)
  // },[dispatch])
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addFields = (field) => {
    setFields((prevData) => ({ ...prevData, ...field }));
    // dispatch(addField({ tableName: data.label, fieldName: Object.keys(field)[0], fieldData: Object.values(field)[0] }));
  };

  const deleteField = (key) => {
    const { [key]: _, ...rest } = fields;
    setFields(rest);
    // dispatch(removeField({tableName:data.label, fieldName:key}))
  };

  const editField = (key, value) => {
    setEditKey(key);
    setInitialFieldData({ key, value });
    openModal();
  };

  const updateField = (field) => {
    const { [editKey]: _, ...rest } = fields;
    setFields({ ...rest, ...field });
    // dispatch(updateFieldState({ tableName: data.label, fieldName: Object.keys(field)[0], fieldData: Object.values(field)[0] }));
    setEditKey(null);
  };

  return (
    <div className="block max-w-sm px-6 py-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id={data.label} />
      <FieldModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editKey !== null ? updateField : addFields}
        tableName={data.label}
        isEdit={editKey !== null}
        initialFieldData={initialFieldData}
      />
      <h1 className="text-xl font-bold">
        {data.label.charAt(0).toUpperCase() + data.label.slice(1)}
      </h1>
      <TableData data={fields} onDelete={deleteField} onEdit={editField} />
      <button
        onClick={openModal}
        className="mt-3 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        Add field
      </button>
    </div>
  );
};
