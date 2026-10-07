const studentId = '23IT033';
const lastDigit = Number(studentId.slice(-1));
module.exports = Object.freeze({
  fullName: 'Nguyễn Mạnh Cường',
  studentId,
  databaseName: `DB_${studentId}`,
  bookCodePrefix: studentId.slice(-3),
  vatPercent: lastDigit + 4,
});
