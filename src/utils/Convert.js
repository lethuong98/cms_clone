import { textFieldClasses } from "@mui/material";

export const toLowerCaseNonAccentVietnamese = (str) => {
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const formatCurrency = (number) => {
  let numberString = number.toString();
  let parts = numberString.split(".");
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? parts[1] : "";
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let formattedNumber =
    formattedInteger + (decimalPart ? "." + decimalPart : "") + "đ";
  return formattedNumber;
};

export const myEncode = (str) => {
  if (!str) {
    return "";
  }
  str = str.replace(/à/g, "af");
  str = str.replace(/á/g, "as");
  str = str.replace(/ả/g, "ar");
  str = str.replace(/ã/g, "ax");
  str = str.replace(/ạ/g, "aj");

  str = str.replace(/ă/g, "aw");
  str = str.replace(/ằ/g, "awf");
  str = str.replace(/ắ/g, "aws");
  str = str.replace(/ẳ/g, "awr");
  str = str.replace(/ẵ/g, "awx");
  str = str.replace(/ặ/g, "awj");

  str = str.replace(/â/g, "aa");
  str = str.replace(/ầ/g, "aaf");
  str = str.replace(/ấ/g, "aas");
  str = str.replace(/ẩ/g, "aar");
  str = str.replace(/ẫ/g, "aax");
  str = str.replace(/ậ/g, "aaj");

  str = str.replace(/é/g, "ef");
  str = str.replace(/è/g, "es");
  str = str.replace(/ẻ/g, "er");
  str = str.replace(/ẽ/g, "ex");
  str = str.replace(/ẹ/g, "ej");

  str = str.replace(/ê/g, "ee");
  str = str.replace(/ề/g, "eef");
  str = str.replace(/ế/g, "ees");
  str = str.replace(/ể/g, "eer");
  str = str.replace(/ễ/g, "eex");
  str = str.replace(/ệ/g, "eej");

  str = str.replace(/ì/g, "if");
  str = str.replace(/í/g, "is");
  str = str.replace(/ỉ/g, "ir");
  str = str.replace(/ĩ/g, "ix");
  str = str.replace(/ị/g, "ij");

  str = str.replace(/ô/g, "oo");
  str = str.replace(/ồ/g, "oof");
  str = str.replace(/ố/g, "oos");
  str = str.replace(/ổ/g, "oor");
  str = str.replace(/ỗ/g, "oox");
  str = str.replace(/ộ/g, "ooj");

  str = str.replace(/ò/g, "of");
  str = str.replace(/ó/g, "os");
  str = str.replace(/ỏ/g, "or");
  str = str.replace(/õ/g, "ox");
  str = str.replace(/ọ/g, "oj");

  str = str.replace(/ơ/g, "ow");
  str = str.replace(/ờ/g, "owf");
  str = str.replace(/ớ/g, "ows");
  str = str.replace(/ở/g, "owr");
  str = str.replace(/ỡ/g, "owx");
  str = str.replace(/ợ/g, "owj");

  str = str.replace(/ù/g, "uf");
  str = str.replace(/ú/g, "us");
  str = str.replace(/ủ/g, "ur");
  str = str.replace(/ũ/g, "ux");
  str = str.replace(/ụ/g, "uj");

  str = str.replace(/ư/g, "uw");
  str = str.replace(/ừ/g, "uwf");
  str = str.replace(/ứ/g, "uws");
  str = str.replace(/ử/g, "uwr");
  str = str.replace(/ữ/g, "uwx");
  str = str.replace(/ự/g, "uwj");

  str = str.replace(/ỳ/g, "yf");
  str = str.replace(/ý/g, "ys");
  str = str.replace(/ỷ/g, "yr");
  str = str.replace(/ỹ/g, "yx");
  str = str.replace(/ỵ/g, "yj");

  str = str.replace(/đ/g, "dd");

  return str;
};

export const myDecode = (str) => {
  if (!str) {
    return "";
  }

  str = str.replace(/awf/g, "ằ");
  str = str.replace(/aws/g, "ắ");
  str = str.replace(/awr/g, "ẳ");
  str = str.replace(/awx/g, "ẵ");
  str = str.replace(/awj/g, "ặ");
  str = str.replace(/aw/g, "ă");

  str = str.replace(/aaf/g, "ầ");
  str = str.replace(/aas/g, "ấ");
  str = str.replace(/aar/g, "ẩ");
  str = str.replace(/aax/g, "ẫ");
  str = str.replace(/aaj/g, "ậ");
  str = str.replace(/aa/g, "â");

  str = str.replace(/eef/g, "ề");
  str = str.replace(/ees/g, "ế");
  str = str.replace(/eer/g, "ể");
  str = str.replace(/eex/g, "ễ");
  str = str.replace(/eej/g, "ệ");
  str = str.replace(/ee/g, "ê");

  str = str.replace(/ef/g, "é");
  str = str.replace(/es/g, "è");
  str = str.replace(/er/g, "ẻ");
  str = str.replace(/ex/g, "ẽ");
  str = str.replace(/ej/g, "ẹ");

  str = str.replace(/if/g, "ì");
  str = str.replace(/is/g, "í");
  str = str.replace(/ir/g, "ỉ");
  str = str.replace(/ix/g, "ĩ");
  str = str.replace(/ij/g, "ị");

  str = str.replace(/oof/g, "ồ");
  str = str.replace(/oos/g, "ố");
  str = str.replace(/oor/g, "ổ");
  str = str.replace(/oox/g, "ỗ");
  str = str.replace(/ooj/g, "ộ");
  str = str.replace(/oo/g, "ô");

  str = str.replace(/owf/g, "ờ");
  str = str.replace(/ows/g, "ớ");
  str = str.replace(/owr/g, "ở");
  str = str.replace(/owx/g, "ỡ");
  str = str.replace(/owj/g, "ợ");
  str = str.replace(/ow/g, "ơ");

  str = str.replace(/uwf/g, "ừ");
  str = str.replace(/uws/g, "ứ");
  str = str.replace(/uwr/g, "ử");
  str = str.replace(/uwx/g, "ữ");
  str = str.replace(/uwj/g, "ự");
  str = str.replace(/uw/g, "ư");

  str = str.replace(/uf/g, "ù");
  str = str.replace(/us/g, "ú");
  str = str.replace(/ur/g, "ủ");
  str = str.replace(/ux/g, "ũ");
  str = str.replace(/uj/g, "ụ");

  str = str.replace(/yf/g, "ỳ");
  str = str.replace(/ys/g, "ý");
  str = str.replace(/yr/g, "ỷ");
  str = str.replace(/yx/g, "ỹ");
  str = str.replace(/yj/g, "ỵ");

  str = str.replace(/of/g, "ò");
  str = str.replace(/os/g, "ó");
  str = str.replace(/or/g, "ỏ");
  str = str.replace(/ox/g, "õ");
  str = str.replace(/oj/g, "ọ");

  str = str.replace(/af/g, "à");
  str = str.replace(/as/g, "á");
  str = str.replace(/ar/g, "ả");
  str = str.replace(/ax/g, "ã");
  str = str.replace(/aj/g, "ạ");

  str = str.replace(/dd/g, "đ");

  return str;
};
export const limitString = (text, limit) => {
  if (text.length >= limit) {
    return text.substr(0, limit - 3) + "...";
  }
  return text;
};
