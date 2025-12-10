import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import AddAddressModal from "../Sections/AddAddress";
import axios from "axios";
export default function ListAddress() {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [userId] = useState(() => {
    return localStorage.getItem("userId");
  });
  const deleteAddress = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/address/delete/${id}`
      );
      if (res.data.success) {
        setAddresses(addresses.filter((addr) => addr.id !== id));
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/address?userId=${userId}`
        );

        if (res.data.success) {
          setAddresses(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddresses();
  }, [userId]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">عناوينى المسجلة</h2>
        <button
          onClick={() => setOpenPopUp(true)}
          className="text-primary font-semibold hover:text-orange-600 transition"
        >
          + إضافة عنوان جديد
        </button>
      </div>

      {/* العنوان المسجل */}
      {addresses.map((address) => (
        <div key={address.id} className=" bg-lightGray rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start ">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {address.addressName}
              </h3>
              <p className="text-gray-600 text-sm">{address.fullAddress}</p>
            </div>
            <div className="flex gap-2 mr-4">
              <button className="p-2 text-blue-500 hover:bg-blue-50 rounded transition">
                <Edit size={20} />
              </button>
              <button
                onClick={() => deleteAddress(address.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setOpenPopUp(true)}
        className="w-full text-brandBlue font-semibold py-3 border-2 border-dashed border-brandBlue rounded-lg hover:bg-lightGray transition"
      >
        + إضافة عنوان جديد
      </button>

      {/* البوب اب */}
      <AddAddressModal
        isOpen={openPopUp}
        onClose={() => setOpenPopUp(false)}
        // onSaveed={fetchAddresses}
      />
    </>
  );
}
