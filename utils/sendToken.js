export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,         
      sameSite: "None",     
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};



// export const sendToken = (user, statusCode, message, res) => {
//     const token = user.generateToken();

//     res
//         .status(statusCode)
//         .cookie('token', token, {
//             expires: new Date(
//                 Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
//             ),
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//         })
//         .json({
//             success: true,
//             message,
//             token,
//             user,
//         });
// };
