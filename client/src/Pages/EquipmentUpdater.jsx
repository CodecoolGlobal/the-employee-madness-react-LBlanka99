import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm/EquipmentForm";
import Loading from "../Components/Loading";

const updateEquipment = (equipment) => {
  return fetch(`/api/equipments/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipments/${id}`).then((res) => res.json());
};

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setequipment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [equipmentLoading, setequipmentLoading] = useState(true);

  useEffect(() => {
    setequipmentLoading(true);
    fetchEquipment(id)
      .then((equipment) => {
        setequipment(equipment);
        setequipmentLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  const handleupdateEquipment = (equipment) => {
    setUpdateLoading(true);
    updateEquipment(equipment)
      .then(() => {
        navigate("/equipments");
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (equipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment}
      onSave={handleupdateEquipment}
      disabled={updateLoading}
      onCancel={() => navigate("/equipments")}
    />
  );
};

export default EquipmentUpdater;
