import React, { useEffect, useState } from 'react';

const useInventory = () => {
  const [inventory, setInventry] = useState([])
  useEffect(() => {
    fetch("https://mighty-brushlands-00325.herokuapp.com/computer")
      .then(res => res.json())
      .then(data => setInventry(data))


  }, [])

  return [inventory, setInventry]
};

export default useInventory;