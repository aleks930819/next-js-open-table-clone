const AuthInput = () => {
  return (
    <div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-4 w-[49%]"
          placeholder="First Name"
        />
        <input
          type="text"
          className="border rounded p-2 py-4 w-[49%]"
          placeholder="Last Name"
        />
      </div>

      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-4 w-full"
          placeholder="Email"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-4 w-[49%]"
          placeholder="Phone"
        />
        <input
          type="text"
          className="border rounded p-2 py-4 w-[49%]"
          placeholder="City"
        />
      </div>

      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-4 w-full"
          placeholder="Password"
        />
      </div>
    </div>
  );
};

export default AuthInput;
