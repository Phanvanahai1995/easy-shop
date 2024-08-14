function ChangePassword() {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-xl text-slate-600 pb-5">Change Password</h2>
      <form className="grid grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-2">
        <label className="flex flex-col gap-1 mb-2">
          Old password
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="old_password"
            placeholder="Old password"
          />
        </label>
        <label className="flex flex-col gap-1 mb-2">
          New password
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="new_password"
            placeholder="New password"
          />
        </label>
        <label className="flex flex-col gap-1 mb-2">
          Confirm password
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
          />
        </label>
        <button className="bg-[#059473] w-[30%] md-lg:w-full px-8 py-2 shadow-lg h-[40px] hover:shadow-green-500/30 text-white rounded-md">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
