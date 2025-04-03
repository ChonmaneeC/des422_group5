export const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/hello");
      if (!response.ok) throw new Error("Failed to fetch users");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  