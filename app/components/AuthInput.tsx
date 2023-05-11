interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}

const AuthInput = ({ inputs, handleChangeInput, isSignIn }: Props) => {
  const { firstName, lastName, email, phone, city, password } = inputs;

  return (
    <div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-4 w-[49%]"
            placeholder="First Name"
            value={firstName}
            onChange={handleChangeInput}
            name="firstName"
          />
          <input
            type="text"
            className="border rounded p-2 py-4 w-[49%]"
            placeholder="Last Name"
            value={lastName}
            onChange={handleChangeInput}
            name="lastName"
          />
        </div>
      )}

      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-4 w-full"
          placeholder="Email"
          value={email}
          onChange={handleChangeInput}
          name="email"
        />
      </div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-4 w-[49%]"
            placeholder="Phone"
            value={phone}
            onChange={handleChangeInput}
            name="phone"
          />
          <input
            type="text"
            className="border rounded p-2 py-4 w-[49%]"
            placeholder="City"
            value={city}
            name="city"
            onChange={handleChangeInput}
          />
        </div>
      )}

      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-4 w-full"
          placeholder="Password"
          value={password}
          onChange={handleChangeInput}
          name="password"
        />
      </div>
    </div>
  );
};

export default AuthInput;
