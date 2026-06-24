function sas_completion(monaco) {
   monaco.languages.registerCompletionItemProvider("sas", {
      provideCompletionItems: function (model, position) {
         var word = model.getWordUntilPosition(position);
         var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
         };
         return {
            suggestions: sas_function_completion(monaco)
         };
      },
   });
}


function sas_function_completion(monaco) {
   // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
   // here you could do a server side lookup
   return [
      {
         label: "array in data step",
         filterText: "array",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "array ${1:var}[*] _character_;\ndo i = 1 to dim(${12:var});\n\t${3:statement};\nend;\n",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "options",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "options notes nomprint nosymbolgen nomlogic nofmterr nosource nosource2 missing=' ' noquotelenmax linesize=max nobyline;",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
         detail: "options notes nomprint ..."
      }, {
         label: "options sasautos",
         filterText: "options sasautos",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'options sasautos = ("${1:path}" SASAUTOS);',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "if then",
         filterText: "if",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "if ${1:condition1} then do;\n\t${2:statement1};\nend;\nelse if ${3:condition2} then do;\n\t${4:statement2};\nend;\nelse do;\n\t${5:statement3};\nend;\n",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "%if %then",
         filterText: "if",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "%if ${1:condition1} %then %do;\n\t${2:statement1};\n%end;\n%else %if ${3:condition2} %then %do;\n\t${4:statement2};\n%end;\n%else %do;\n\t${5:statement3};\n%end;\n",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "do to",
         filterText: "do",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'do i = 1 to ${1:num};\n\t${2:statement};\nend;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "%do %to",
         filterText: "do",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: '%do i = 1 %to &${1:num};\n\t${2:statement};\n%end;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "do until",
         filterText: "dountil",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'do until (${1:condition});\n\t${2:statement};\n\t${3:statement2};\nend;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "%do %until",
         filterText: "dountil",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: '%do %until (${1:&condition});\n\t${2:statement};\n\t${3:statement2};\n%end;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "do while",
         filterText: "dowhile",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'do while (${1:condition});\n\t${2:statement1};\n\t${3:statement2};\nend;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "%do %while",
         filterText: "dowhile",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: '%do %while (${1:&condition});\n\t${2:statement1};\n\t${3:statement2};\n%end;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "%macro test",
         filterText: "test",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "%macro test(\n\ta=\n);\n\t${1:write your code here}\n%mend test;",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: 'put "ERROR: "',
         filterText: "error",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'put "ERROR: " ${1:var}=;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "%put ERROR: ",
         filterText: "error",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "%put ERROR: &=${1:mvar};\n",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "select when in data step",
         filterText: "select",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "select (${1:var});\n\twhen (${2:condition1})\n\t\t${5:statement1};\n\twhen (${3:condition2})\n\t\t${6:statement2};\n\twhen (${4:condition3})\n\t\t${7:statement3};\n\totherwise\n\t\t${8:statement4};\nend;\n",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "proc compare",
         filterText: "compare",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'proc compare data=${1:base_ds} compare=${2:comapre_ds}\n\tout=result outnoequal outbase outcomp outdif\n\tmaxprint=32000 listobs listequalvar listvar listall warning method=absolute criterion=0.00001;\nquit;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "proc sql",
         filterText: "sql",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "proc sql noprint;\n\tcreate table ${1:ds_name1} as\n\t\tselect distinct *\n\t\t\tfrom ${2:ds_name2} as a;\nquit;\n",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "proc sort",
         filterText: "sort",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "proc sort data = ${1:ds_name1} out = ${2:ds_name2};\n\tby ${3:vars};\nquit;\n",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "kill library",
         filterText: "kill",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: "proc datasets lib=work kill memtype=data nolist;quit;\n",
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "proc import",
         filterText: "import",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'proc import out=excel\n\tdatafile="${1:path}"\n\tdbms =xlsx replace;\n\tsheet="${2:Sheet1}";\nquit;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "proc export",
         filterText: "export",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'proc export data=excel\n\toutfile="${1:path}"\n\tdbms=xlsx replace;\n\tsheet="${2:Sheet1}";\nquit;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "data step",
         filterText: "data",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'data ${1:ds_name1};\n\tset ${2:ds_name2};\nrun;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "proc datasets",
         filterText: "datasets",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'proc datasets library=${1:work};\n\tcopy out=${2:lib_name};\nquit;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         label: "proc copy",
         filterText: "copy",
         kind: monaco.languages.CompletionItemKind.User,
         insertText: 'proc copy in=${1:work} out=${2:lib_name};quit;\n',
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }
   ].concat(
      [{
         filterText: "abs",
         label: "abs(argument)",
         insertText: "abs(${1:argument})",
         documentation: "Returns the absolute value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "addrlong",
         label: "addrlong(variable)",
         insertText: "addrlong(${1:variable})",
         documentation: "Returns the memory address of a variable on a 64-bit platform.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "airy",
         label: "airy(x)",
         insertText: "airy(${1:x})",
         documentation: "Returns the value of a differential equation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "allcomb",
         label: "allcomb(count, k, variable)",
         insertText: "allcomb(${1:count}, ${2:k}, ${3:variable})",
         documentation: "Generates all combinations of the values of n variables taken k at a time in a minimal change order.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "allperm",
         label: "allperm(count, variable)",
         insertText: "allperm(${1:count}, ${2:variable})",
         documentation: "Generates all permutations of the values of several variables in a minimal change order.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anorm420",
         label: "anorm420(string, modifiers)",
         insertText: "anorm420(${1:string}, ${2:modifiers})",
         documentation: "Returns a normalized string from an input string encoded in EBCDIC420.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anyalnum",
         label: "anyalnum(string, start)",
         insertText: "anyalnum(${1:string}, ${2:start})",
         documentation: "Searches a character string for an alphanumeric character, and returns the first position at which the character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anyalpha",
         label: "anyalpha(string, start)",
         insertText: "anyalpha(${1:string}, ${2:start})",
         documentation: "Searches a character string for an alphabetic character, and returns the first position at which the character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anycntrl",
         label: "anycntrl(string, start)",
         insertText: "anycntrl(${1:string}, ${2:start})",
         documentation: "Searches a character string for a control character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anydigit",
         label: "anydigit(string, start)",
         insertText: "anydigit(${1:string}, ${2:start})",
         documentation: "Searches a character string for a digit, and returns the first position at which the digit is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anyfirst",
         label: "anyfirst(string, start)",
         insertText: "anyfirst(${1:string}, ${2:start})",
         documentation: "Searches a character string for a character that is valid as the first character in a SAS variable name under VALIDVARNAME=V7, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anygraph",
         label: "anygraph(string, start)",
         insertText: "anygraph(${1:string}, ${2:start})",
         documentation: "Searches a character string for a graphical character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anylower",
         label: "anylower(string, start)",
         insertText: "anylower(${1:string}, ${2:start})",
         documentation: "Searches a character string for a lowercase letter, and returns the first position at which the letter is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anyname",
         label: "anyname(string, start)",
         insertText: "anyname(${1:string}, ${2:start})",
         documentation: "Searches a character string for a character that is valid in a SAS variable name under VALIDVARNAME=V7, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anyprint",
         label: "anyprint(string, start)",
         insertText: "anyprint(${1:string}, ${2:start})",
         documentation: "Searches a character string for a printable character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anypunct",
         label: "anypunct(string, start)",
         insertText: "anypunct(${1:string}, ${2:start})",
         documentation: "Searches a character string for a punctuation character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anyspace",
         label: "anyspace(string, start)",
         insertText: "anyspace(${1:string}, ${2:start})",
         documentation: "Searches a character string for a whitespace character (blank, horizontal or vertical tab, carriage return, line feed, and form feed), and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anyupper",
         label: "anyupper(string, start)",
         insertText: "anyupper(${1:string}, ${2:start})",
         documentation: "Searches a character string for an uppercase letter, and returns the first position at which the letter is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "anyxdigit",
         label: "anyxdigit(string, start)",
         insertText: "anyxdigit(${1:string}, ${2:start})",
         documentation: "Searches a character string for a hexadecimal character that represents a digit, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "arcos",
         label: "arcos(argument)",
         insertText: "arcos(${1:argument})",
         documentation: "Returns the arccosine.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "arcosh",
         label: "arcosh(x)",
         insertText: "arcosh(${1:x})",
         documentation: "Returns the inverse hyperbolic cosine.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "arsin",
         label: "arsin(argument)",
         insertText: "arsin(${1:argument})",
         documentation: "Returns the arcsine.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "arsinh",
         label: "arsinh(x)",
         insertText: "arsinh(${1:x})",
         documentation: "Returns the inverse hyperbolic sine.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "artanh",
         label: "artanh(x)",
         insertText: "artanh(${1:x})",
         documentation: "Returns the inverse hyperbolic tangent.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "atan",
         label: "atan(argument)",
         insertText: "atan(${1:argument})",
         documentation: "Returns the arc tangent.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "atan2",
         label: "atan2(expression-1, expression-2)",
         insertText: "atan2(${1:expression-1}, ${2:expression-2})",
         documentation: "Returns the arc tangent of the x and y coordinates of a right triangle, in radians.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "attrc",
         label: "attrc(data-set-id, CHARSET, COMPRESS, DATAREP, ENCODING, ENCRYPT, ENGINE, LABEL, LIB, MEM, MODE, MTYPE, SORTEDBY, SORTLVL, SORTSEQ, TYPE)",
         insertText: "attrc(${1:data-set-id}, ${2:CHARSET}, ${3:COMPRESS}, ${4:DATAREP}, ${5:ENCODING}, ${6:ENCRYPT}, ${7:ENGINE}, ${8:LABEL}, ${9:LIB}, ${10:MEM}, ${11:MODE}, ${12:MTYPE}, ${13:SORTEDBY}, ${14:SORTLVL}, ${15:SORTSEQ}, ${16:TYPE})",
         documentation: "Returns the value of a character attribute for a SAS data set.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "attrn",
         label: "attrn(data-set-id, ALTERPW, ANOBS, ANY, ARAND, ARWU, AUDIT, AUDIT_DATA, AUDIT_BEFORE, AUDIT_ERROR, CRDTE, ICONST, INDEX, ISINDEX, ISSUBSET, LRECL, LRID, MAXGEN, MAXRC, MODTE, NDEL, NEXTGEN, NLOBS, NLOBSF, NOBS, NVARS, PW, RADIX, READPW, REUSE, TAPE, WHSTMT, WRITEPW)",
         insertText: "attrn(${1:data-set-id}, ${2:ALTERPW}, ${3:ANOBS}, ${4:ANY}, ${5:ARAND}, ${6:ARWU}, ${7:AUDIT}, ${8:AUDIT_DATA}, ${9:AUDIT_BEFORE}, ${10:AUDIT_ERROR}, ${11:CRDTE}, ${12:ICONST}, ${13:INDEX}, ${14:ISINDEX}, ${15:ISSUBSET}, ${16:LRECL}, ${17:LRID}, ${18:MAXGEN}, ${19:MAXRC}, ${20:MODTE}, ${21:NDEL}, ${22:NEXTGEN}, ${23:NLOBS}, ${24:NLOBSF}, ${25:NOBS}, ${26:NVARS}, ${27:PW}, ${28:RADIX}, ${29:READPW}, ${30:REUSE}, ${31:TAPE}, ${32:WHSTMT}, ${33:WRITEPW})",
         documentation: "Returns the value of a numeric attribute for a SAS data set.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "band",
         label: "band(argument-1, argument-2)",
         insertText: "band(${1:argument-1}, ${2:argument-2})",
         documentation: "Returns the bitwise logical AND of 32-bit integer values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "basechar",
         label: "basechar(str, instr, Unicode)",
         insertText: "basechar(${1:str}, ${2:instr}, ${3:Unicode})",
         documentation: "Converts characters to base characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "beta",
         label: "beta(a, b)",
         insertText: "beta(${1:a}, ${2:b})",
         documentation: "Returns the value of the beta function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "betainv",
         label: "betainv(p, a, b)",
         insertText: "betainv(${1:p}, ${2:a}, ${3:b})",
         documentation: "Returns a quantile from the beta distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "bhamming_32",
         label: "bhamming_32(argument-1, argument-2)",
         insertText: "bhamming_32(${1:argument-1}, ${2:argument-2})",
         documentation: "Returns the bitwise Hamming distance between two 32-bit integer values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "bhamming_hex",
         label: "bhamming_hex(hex-string-1, hex-string-2)",
         insertText: "bhamming_hex(${1:hex-string-1}, ${2:hex-string-2})",
         documentation: "Returns the bitwise Hamming distance between two hexadecimal bit strings.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "blackclprc",
         label: "blackclprc(E, t, F, r, sigma)",
         insertText: "blackclprc(${1:E}, ${2:t}, ${3:F}, ${4:r}, ${5:sigma})",
         documentation: "Calculates call prices for European options on futures, based on the Black model.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "blackptprc",
         label: "blackptprc(E, t, F, r, sigma)",
         insertText: "blackptprc(${1:E}, ${2:t}, ${3:F}, ${4:r}, ${5:sigma})",
         documentation: "Calculates put prices for European options on futures, based on the Black model.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "blkshclprc",
         label: "blkshclprc(E, t, S, r, sigma)",
         insertText: "blkshclprc(${1:E}, ${2:t}, ${3:S}, ${4:r}, ${5:sigma})",
         documentation: "Calculates call prices for European options on stocks, based on the Black-Scholes model.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "blkshptprc",
         label: "blkshptprc(E, t, S, r, sigma)",
         insertText: "blkshptprc(${1:E}, ${2:t}, ${3:S}, ${4:r}, ${5:sigma})",
         documentation: "Calculates put prices for European options on stocks, based on the Black-Scholes model.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "blshift",
         label: "blshift(argument-1, argument-2)",
         insertText: "blshift(${1:argument-1}, ${2:argument-2})",
         documentation: "Returns the bitwise logical left shift of two 32-bit integer values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "bnot",
         label: "bnot(argument)",
         insertText: "bnot(${1:argument})",
         documentation: "Returns the bitwise logical NOT of 32-bit integer values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "bor",
         label: "bor(argument-1, argument-2)",
         insertText: "bor(${1:argument-1}, ${2:argument-2})",
         documentation: "Returns the bitwise logical OR of 32-bit integer values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "brshift",
         label: "brshift(argument-1, argument-2)",
         insertText: "brshift(${1:argument-1}, ${2:argument-2})",
         documentation: "Returns the bitwise logical right shift of 32-bit integer values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "btrim",
         label: "btrim(sql-expression, LEADING, TRAILING, BOTH, btrim-character)",
         insertText: "btrim(${1:sql-expression}, ${2:LEADING}, ${3:TRAILING}, ${4:BOTH}, ${5:btrim-character})",
         documentation: "Removes blanks or specified characters from the beginning, the end, or both the beginning and end of a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "bxor",
         label: "bxor(argument-1, argument-2)",
         insertText: "bxor(${1:argument-1}, ${2:argument-2})",
         documentation: "Returns the bitwise logical EXCLUSIVE OR of two 32-bit integer values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "byte",
         label: "byte(n)",
         insertText: "byte(${1:n})",
         documentation: "Returns one character in the ASCII collating sequence.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cat",
         label: "cat(item)",
         insertText: "cat(${1:item})",
         documentation: "Does not remove leading or trailing blanks and returns a concatenated character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "catq",
         label: "catq(1, 2, a, b, c, d, h, m, n, q, s, t, x, item, delimiter)",
         insertText: "catq(${1:1}, ${2:2}, ${3:a}, ${4:b}, ${5:c}, ${6:d}, ${7:h}, ${8:m}, ${9:n}, ${10:q}, ${11:s}, ${12:t}, ${13:x}, ${14:item}, ${15:delimiter})",
         documentation: "Concatenates character and numeric values by using a delimiter to separate items and by adding quotation marks to strings that contain the delimiter.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cats",
         label: "cats(item)",
         insertText: "cats(${1:item})",
         documentation: "Removes leading and trailing blanks, and returns a concatenated character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "catt",
         label: "catt(item)",
         insertText: "catt(${1:item})",
         documentation: "Removes trailing blanks, and returns a concatenated character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "catx",
         label: "catx(delimiter, item)",
         insertText: "catx(${1:delimiter}, ${2:item})",
         documentation: "Removes leading and trailing blanks, inserts delimiters, and returns a concatenated character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cdf",
         label: "cdf(distribution, quantile, parameter)",
         insertText: "cdf(${1:distribution}, ${2:quantile}, ${3:parameter})",
         documentation: "Returns a value from a cumulative probability distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ceil",
         label: "ceil(argument)",
         insertText: "ceil(${1:argument})",
         documentation: "Returns the smallest integer that is greater than or equal to the argument, fuzzed to avoid unexpected floating-point results.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ceilz",
         label: "ceilz(argument)",
         insertText: "ceilz(${1:argument})",
         documentation: "Returns the smallest integer that is greater than or equal to the argument, using zero fuzzing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cexist",
         label: "cexist(entry, 'U')",
         insertText: "cexist(${1:entry}, ${2:'U'})",
         documentation: "Verifies the existence of a SAS catalog or SAS catalog entry.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "char",
         label: "char(string, position)",
         insertText: "char(${1:string}, ${2:position})",
         documentation: "Returns a single character from a specified position in a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "choosec",
         label: "choosec(index-expression, selection)",
         insertText: "choosec(${1:index-expression}, ${2:selection})",
         documentation: "Returns a character value that represents the results of choosing from a list of arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "choosen",
         label: "choosen(index-expression, selection)",
         insertText: "choosen(${1:index-expression}, ${2:selection})",
         documentation: "Returns a numeric value that represents the results of choosing from a list of arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cinv",
         label: "cinv(p, df, nc)",
         insertText: "cinv(${1:p}, ${2:df}, ${3:nc})",
         documentation: "Returns a quantile from the chi-square distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "clibexist",
         label: "clibexist(session, caslib, uuid)",
         insertText: "clibexist(${1:session}, ${2:caslib}, ${3:uuid})",
         documentation: "Returns 0 when the specified caslib name is not found and 1 when the caslib is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "close",
         label: "close(data-set-id)",
         insertText: "close(${1:data-set-id})",
         documentation: "Closes a SAS data set.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cmiss",
         label: "cmiss(argument)",
         insertText: "cmiss(${1:argument})",
         documentation: "Counts the number of missing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cnonct",
         label: "cnonct(x, df, probability)",
         insertText: "cnonct(${1:x}, ${2:df}, ${3:probability})",
         documentation: "Returns the noncentrality parameter from a chi-square distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "coalesce",
         label: "coalesce(column-name)",
         insertText: "coalesce(${1:column-name})",
         documentation: "Returns the first nonmissing value from a list of columns.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "coalescec",
         label: "coalescec(argument)",
         insertText: "coalescec(${1:argument})",
         documentation: "Returns the first nonmissing value from a list of character arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "collate",
         label: "collate(start-position, end-position, length)",
         insertText: "collate(${1:start-position}, ${2:end-position}, ${3:length})",
         documentation: "Returns a character string in the ASCII collating sequence.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "comb",
         label: "comb(n, r)",
         insertText: "comb(${1:n}, ${2:r})",
         documentation: "Computes the number of combinations of n elements taken r at a time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compare",
         label: "compare(string-1, string-2, modifier)",
         insertText: "compare(${1:string-1}, ${2:string-2}, ${3:modifier})",
         documentation: "Returns the position of the leftmost character by which two strings differ, or returns 0 if there is no difference.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compbl",
         label: "compbl(source)",
         insertText: "compbl(${1:source})",
         documentation: "Removes multiple blanks from a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compfuzz",
         label: "compfuzz(value-1, value-2, fuzz, scale)",
         insertText: "compfuzz(${1:value-1}, ${2:value-2}, ${3:fuzz}, ${4:scale})",
         documentation: "Performs a fuzzy comparison of two numeric values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compfuzz_miss",
         label: "compfuzz_miss(value-1, value-2, fuzz, scale)",
         insertText: "compfuzz_miss(${1:value-1}, ${2:value-2}, ${3:fuzz}, ${4:scale})",
         documentation: "Performs comparisons of missing numeric values and fuzzy comparisons of nonmissing numeric values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compged",
         label: "compged(string-1, string-2, cutoff, modifier)",
         insertText: "compged(${1:string-1}, ${2:string-2}, ${3:cutoff}, ${4:modifier})",
         documentation: "Returns the generalized edit distance between two strings.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "complev",
         label: "complev(string-1, string-2, cutoff, modifier)",
         insertText: "complev(${1:string-1}, ${2:string-2}, ${3:cutoff}, ${4:modifier})",
         documentation: "Returns the Levenshtein edit distance between two strings.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compound",
         label: "compound(a, f, r, n)",
         insertText: "compound(${1:a}, ${2:f}, ${3:r}, ${4:n})",
         documentation: "Returns compound interest parameters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compress",
         label: "compress(source, characters, modifier)",
         insertText: "compress(${1:source}, ${2:characters}, ${3:modifier})",
         documentation: "Returns a character string with specified characters removed from the original string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compsrv_oval",
         label: "compsrv_oval(macro-variable-name)",
         insertText: "compsrv_oval(${1:macro-variable-name})",
         documentation: "Returns the original, possibly unsafe, value of an input parameter or global macro variable that is passed into the Compute server.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "compsrv_unquote2",
         label: "compsrv_unquote2(macro-variable-name)",
         insertText: "compsrv_unquote2(${1:macro-variable-name})",
         documentation: "Unmasks matched pairs of quotation marks in an input parameter or global macro variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "constant",
         label: "constant(constant, parameter)",
         insertText: "constant(${1:constant}, ${2:parameter})",
         documentation: "Computes machine and mathematical constants.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "convx",
         label: "convx(y, f, c)",
         insertText: "convx(${1:y}, ${2:f}, ${3:c})",
         documentation: "Returns the convexity for an enumerated cash flow.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "convxp",
         label: "convxp(A, c, n, K, k0, y)",
         insertText: "convxp(${1:A}, ${2:c}, ${3:n}, ${4:K}, ${5:k0}, ${6:y})",
         documentation: "Returns the convexity for a periodic cash flow stream such as a bond.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cos",
         label: "cos(argument)",
         insertText: "cos(${1:argument})",
         documentation: "Returns the cosine.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cosh",
         label: "cosh(argument)",
         insertText: "cosh(${1:argument})",
         documentation: "Returns the hyperbolic cosine.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cot",
         label: "cot(argument)",
         insertText: "cot(${1:argument})",
         documentation: "Returns the cotangent.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "count",
         label: "count(string, substring, modifier)",
         insertText: "count(${1:string}, ${2:substring}, ${3:modifier})",
         documentation: "Counts the number of times that a specified substring appears within a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "countc",
         label: "countc(string, character-list, modifier)",
         insertText: "countc(${1:string}, ${2:character-list}, ${3:modifier})",
         documentation: "Counts the number of characters that appear or do not appear in a list of characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "countw",
         label: "countw(string, character, modifier)",
         insertText: "countw(${1:string}, ${2:character}, ${3:modifier})",
         documentation: "Counts the number of words in a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "csc",
         label: "csc(argument)",
         insertText: "csc(${1:argument})",
         documentation: "Returns the cosecant.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "css",
         label: "css(argument)",
         insertText: "css(${1:argument})",
         documentation: "Returns the corrected sum of squares.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cumipmt",
         label: "cumipmt(rate, number-of-periods, principal-amount, start-period, end-period, type)",
         insertText: "cumipmt(${1:rate}, ${2:number-of-periods}, ${3:principal-amount}, ${4:start-period}, ${5:end-period}, ${6:type})",
         documentation: "Returns the cumulative interest paid on a loan between the start and end periods.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cumprinc",
         label: "cumprinc(rate, number-of-periods, principal-amount, start-period, end-period, type)",
         insertText: "cumprinc(${1:rate}, ${2:number-of-periods}, ${3:principal-amount}, ${4:start-period}, ${5:end-period}, ${6:type})",
         documentation: "Returns the cumulative principal paid on a loan between the start and end periods.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "curobs",
         label: "curobs(data-set-id)",
         insertText: "curobs(${1:data-set-id})",
         documentation: "Returns the observation number of the current observation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "cv",
         label: "cv(argument)",
         insertText: "cv(${1:argument})",
         documentation: "Returns the coefficient of variation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "daccdb",
         label: "daccdb(p, v, y, r)",
         insertText: "daccdb(${1:p}, ${2:v}, ${3:y}, ${4:r})",
         documentation: "Returns the accumulated declining balance depreciation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "daccdbsl",
         label: "daccdbsl(p, v, y, r)",
         insertText: "daccdbsl(${1:p}, ${2:v}, ${3:y}, ${4:r})",
         documentation: "Returns the accumulated declining balance with conversion to a straight-line depreciation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "daccsl",
         label: "daccsl(p, v, y)",
         insertText: "daccsl(${1:p}, ${2:v}, ${3:y})",
         documentation: "Returns the accumulated straight-line depreciation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "daccsyd",
         label: "daccsyd(p, v, y)",
         insertText: "daccsyd(${1:p}, ${2:v}, ${3:y})",
         documentation: "Returns the accumulated sum-of-years-digits depreciation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dacctab",
         label: "dacctab(p, v, t1,)",
         insertText: "dacctab(${1:p}, ${2:v}, ${3:t1,})",
         documentation: "Returns the accumulated depreciation from specified tables.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dairy",
         label: "dairy(x)",
         insertText: "dairy(${1:x})",
         documentation: "Returns the derivative of the AIRY function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "datdif",
         label: "datdif(start-date, end-date, '30/360', 'ACT/ACT', 'ACT/360', 'ACT/365')",
         insertText: "datdif(${1:start-date}, ${2:end-date}, ${3:'30/360'}, ${4:'ACT/ACT'}, ${5:'ACT/360'}, ${6:'ACT/365'})",
         documentation: "Returns the number of days between two dates after computing the difference between the dates according to specified day count conventions.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "datejul",
         label: "datejul(julian-date)",
         insertText: "datejul(${1:julian-date})",
         documentation: "Converts a Julian date to a SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "datepart",
         label: "datepart(datetime)",
         insertText: "datepart(${1:datetime})",
         documentation: "Extracts the date from a SAS datetime value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "day",
         label: "day(date)",
         insertText: "day(${1:date})",
         documentation: "Returns the day of the month from a SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dclose",
         label: "dclose(directory-id)",
         insertText: "dclose(${1:directory-id})",
         documentation: "Closes a directory that was opened by the DOPEN function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dcreate",
         label: "dcreate(directory-name, parent-directory)",
         insertText: "dcreate(${1:directory-name}, ${2:parent-directory})",
         documentation: "Returns the complete pathname of a new, external directory.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "depdb",
         label: "depdb(p, v, y, r)",
         insertText: "depdb(${1:p}, ${2:v}, ${3:y}, ${4:r})",
         documentation: "Returns the declining balance depreciation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "depdbsl",
         label: "depdbsl(p, v, y, r)",
         insertText: "depdbsl(${1:p}, ${2:v}, ${3:y}, ${4:r})",
         documentation: "Returns the declining balance with conversion to a straight-line depreciation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "depsl",
         label: "depsl(p, v, y)",
         insertText: "depsl(${1:p}, ${2:v}, ${3:y})",
         documentation: "Returns the straight-line depreciation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "depsyd",
         label: "depsyd(p, v, y)",
         insertText: "depsyd(${1:p}, ${2:v}, ${3:y})",
         documentation: "Returns the sum-of-years-digits depreciation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "deptab",
         label: "deptab(p, v, t1,)",
         insertText: "deptab(${1:p}, ${2:v}, ${3:t1,})",
         documentation: "Returns the depreciation from specified tables.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dequote",
         label: "dequote(string)",
         insertText: "dequote(${1:string})",
         documentation: "Removes matching quotation marks from a character string that begins with a quotation mark, and deletes all characters to the right of the closing quotation mark.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "deviance",
         label: "deviance(distribution, variable, shape-parameter, \u03b5)",
         insertText: "deviance(${1:distribution}, ${2:variable}, ${3:shape-parameter}, ${4:\u03b5})",
         documentation: "Returns the deviance based on a probability distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dhms",
         label: "dhms(date, hour, minute, second)",
         insertText: "dhms(${1:date}, ${2:hour}, ${3:minute}, ${4:second})",
         documentation: "Returns a SAS datetime value from date, hour, minute, and second values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dif",
         label: "dif(argument, n)",
         insertText: "dif(${1:argument}, ${2:n})",
         documentation: "Returns differences between an argument and its nth lag.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "digamma",
         label: "digamma(argument)",
         insertText: "digamma(${1:argument})",
         documentation: "Returns the value of the digamma function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dim",
         label: "dim(array-name, bound-n, n)",
         insertText: "dim(${1:array-name}, ${2:bound-n}, ${3:n})",
         documentation: "Returns the number of elements in an array.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dinfo",
         label: "dinfo(directory-id, information-item)",
         insertText: "dinfo(${1:directory-id}, ${2:information-item})",
         documentation: "Returns information about a directory.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "divide",
         label: "divide(x, y)",
         insertText: "divide(${1:x}, ${2:y})",
         documentation: "Returns the result of a division that handles special missing values for ODS output.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dlgcdir",
         label: "dlgcdir(working_directory)",
         insertText: "dlgcdir(${1:working_directory})",
         documentation: "Sets the working directory.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dnum",
         label: "dnum(directory-id)",
         insertText: "dnum(${1:directory-id})",
         documentation: "Returns the number of members in a directory.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dopen",
         label: "dopen(fileref)",
         insertText: "dopen(${1:fileref})",
         documentation: "Opens a directory, and returns a directory identifier value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "doptname",
         label: "doptname(directory-id, nval)",
         insertText: "doptname(${1:directory-id}, ${2:nval})",
         documentation: "Returns directory attribute information.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "doptnum",
         label: "doptnum(directory-id)",
         insertText: "doptnum(${1:directory-id})",
         documentation: "Returns the number of information items that are available for a directory.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dosubl",
         label: "dosubl(x)",
         insertText: "dosubl(${1:x})",
         documentation: "Enables the immediate execution of SAS code after a text string is passed.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dread",
         label: "dread(directory-id, nval)",
         insertText: "dread(${1:directory-id}, ${2:nval})",
         documentation: "Returns the name of a directory member.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dropnote",
         label: "dropnote(data-set-id, note-id)",
         insertText: "dropnote(${1:data-set-id}, ${2:note-id})",
         documentation: "Deletes a note marker from a SAS data set or an external file.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dsname",
         label: "dsname(data-set-id)",
         insertText: "dsname(${1:data-set-id})",
         documentation: "Returns the SAS data set name that is associated with a data set identifier.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dur",
         label: "dur(y, f, c)",
         insertText: "dur(${1:y}, ${2:f}, ${3:c})",
         documentation: "Returns the modified duration for an enumerated cash flow.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "durp",
         label: "durp(A, c, n, K, k0, y)",
         insertText: "durp(${1:A}, ${2:c}, ${3:n}, ${4:K}, ${5:k0}, ${6:y})",
         documentation: "Returns the modified duration for a periodic cash flow stream, such as a bond.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "effrate",
         label: "effrate(compounding-interval, rate)",
         insertText: "effrate(${1:compounding-interval}, ${2:rate})",
         documentation: "Returns the effective annual interest rate.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "encodcompat",
         label: "encodcompat(source1, source2)",
         insertText: "encodcompat(${1:source1}, ${2:source2})",
         documentation: "Verifies the transcoding compatibility between two encodings.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "encodisvalid",
         label: "encodisvalid(source)",
         insertText: "encodisvalid(${1:source})",
         documentation: "Verifies a valid encoding name.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "envlen",
         label: "envlen(argument)",
         insertText: "envlen(${1:argument})",
         documentation: "Returns the length of an environment variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "erf",
         label: "erf(argument)",
         insertText: "erf(${1:argument})",
         documentation: "Returns the value of the (normal) error function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "erfc",
         label: "erfc(argument)",
         insertText: "erfc(${1:argument})",
         documentation: "Returns the value of the complementary (normal) error function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "euclid",
         label: "euclid(value)",
         insertText: "euclid(${1:value})",
         documentation: "Returns the Euclidean norm of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "exist",
         label: "exist(member-name, member-type, generation)",
         insertText: "exist(${1:member-name}, ${2:member-type}, ${3:generation})",
         documentation: "Verifies the existence of a SAS library member within a currently assigned SAS data library.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "exp",
         label: "exp(argument)",
         insertText: "exp(${1:argument})",
         documentation: "Returns the value of the exponential function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "expm1",
         label: "expm1(x)",
         insertText: "expm1(${1:x})",
         documentation: "Returns 1 less than the exponential function of the argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fact",
         label: "fact(n)",
         insertText: "fact(${1:n})",
         documentation: "Computes a factorial.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fappend",
         label: "fappend(file-id, cc)",
         insertText: "fappend(${1:file-id}, ${2:cc})",
         documentation: "Appends the current record to the end of an external file.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fclose",
         label: "fclose(file-id)",
         insertText: "fclose(${1:file-id})",
         documentation: "Closes an external file, directory, or directory member.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fcol",
         label: "fcol(file-id)",
         insertText: "fcol(${1:file-id})",
         documentation: "Returns the current column position in the File Data Buffer (FDB).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fcopy",
         label: "fcopy('fileref-1', 'fileref-2')",
         insertText: "fcopy(${1:'fileref-1'}, ${2:'fileref-2'})",
         documentation: "Copies records from one fileref to another fileref, and returns a value that indicates whether the records were successfully copied.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fdelete",
         label: "fdelete(fileref, directory)",
         insertText: "fdelete(${1:fileref}, ${2:directory})",
         documentation: "Deletes an external file or an empty directory.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fetch",
         label: "fetch(data-set-id, 'NOSET')",
         insertText: "fetch(${1:data-set-id}, ${2:'NOSET'})",
         documentation: "Reads the next non-deleted observation from a SAS data set into the Data Set Data Vector (DDV).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fetchobs",
         label: "fetchobs(data-set-id, observation-number, options)",
         insertText: "fetchobs(${1:data-set-id}, ${2:observation-number}, ${3:options})",
         documentation: "Reads a specified observation from a SAS data set into the Data Set Data Vector (DDV).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fexist",
         label: "fexist(fileref)",
         insertText: "fexist(${1:fileref})",
         documentation: "Verifies the existence of an external file that is associated with a fileref.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fget",
         label: "fget(file-id, variable, length)",
         insertText: "fget(${1:file-id}, ${2:variable}, ${3:length})",
         documentation: "Copies data from the File Data Buffer (FDB) into a variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fileexist",
         label: "fileexist(filename)",
         insertText: "fileexist(${1:filename})",
         documentation: "Verifies the existence of an external file by its physical name.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "filename",
         label: "filename(fileref, filename, DISK, DUMMY, GTERM, PIPE, PLOTTER, PRINTER, TAPE, TEMP, TERMINAL, UPRINTER, 'host-options', directory-reference)",
         insertText: "filename(${1:fileref}, ${2:filename}, ${3:DISK}, ${4:DUMMY}, ${5:GTERM}, ${6:PIPE}, ${7:PLOTTER}, ${8:PRINTER}, ${9:TAPE}, ${10:TEMP}, ${11:TERMINAL}, ${12:UPRINTER}, ${13:'host-options'}, ${14:directory-reference})",
         documentation: "Assigns or deassigns a fileref to an external file, directory, or output device.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fileref",
         label: "fileref(fileref)",
         insertText: "fileref(${1:fileref})",
         documentation: "Verifies whether a fileref has been assigned for the current SAS session.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "finance",
         label: "finance(string-identifier, basis, interest-rates, dates, sign-of-cash-values)",
         insertText: "finance(${1:string-identifier}, ${2:basis}, ${3:interest-rates}, ${4:dates}, ${5:sign-of-cash-values})",
         documentation: "Computes financial calculations such as depreciation, maturation, accrued interest, net present value, periodic savings, and internal rates of return.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "find",
         label: "find(string, substring, i, t, start-position)",
         insertText: "find(${1:string}, ${2:substring}, ${3:i}, ${4:t}, ${5:start-position})",
         documentation: "Searches for a specific substring of characters within a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "findc",
         label: "findc(string, character-list, blank, a, b, c, d, f, g, h, i, k, l, n, o, p, s, t, u, v, w, x, start-position)",
         insertText: "findc(${1:string}, ${2:character-list}, ${3:blank}, ${4:a}, ${5:b}, ${6:c}, ${7:d}, ${8:f}, ${9:g}, ${10:h}, ${11:i}, ${12:k}, ${13:l}, ${14:n}, ${15:o}, ${16:p}, ${17:s}, ${18:t}, ${19:u}, ${20:v}, ${21:w}, ${22:x}, ${23:start-position})",
         documentation: "Searches a string for any character in a list of characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "findw",
         label: "findw(string, word, character, start-position, blank, a, b, c, d, e, f, g, h, i, k, l, m, n, o, p, q, r, s, t, u, w, x)",
         insertText: "findw(${1:string}, ${2:word}, ${3:character}, ${4:start-position}, ${5:blank}, ${6:a}, ${7:b}, ${8:c}, ${9:d}, ${10:e}, ${11:f}, ${12:g}, ${13:h}, ${14:i}, ${15:k}, ${16:l}, ${17:m}, ${18:n}, ${19:o}, ${20:p}, ${21:q}, ${22:r}, ${23:s}, ${24:t}, ${25:u}, ${26:w}, ${27:x})",
         documentation: "Returns the character position of a word in a string, or returns the number of the word in a string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "finfo",
         label: "finfo(file-id, information-item)",
         insertText: "finfo(${1:file-id}, ${2:information-item})",
         documentation: "Returns the value of a file information item.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "finv",
         label: "finv(p, ndf, ddf, nc)",
         insertText: "finv(${1:p}, ${2:ndf}, ${3:ddf}, ${4:nc})",
         documentation: "Returns a quantile from the F distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fipname",
         label: "fipname(expression)",
         insertText: "fipname(${1:expression})",
         documentation: "Converts two-digit FIPS codes to uppercase state names.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fipnamel",
         label: "fipnamel(expression)",
         insertText: "fipnamel(${1:expression})",
         documentation: "Converts two-digit FIPS codes to mixed case state names.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fipstate",
         label: "fipstate(expression)",
         insertText: "fipstate(${1:expression})",
         documentation: "Converts two-digit FIPS codes to two-character state postal codes.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "first",
         label: "first(string)",
         insertText: "first(${1:string})",
         documentation: "Returns the first character in a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "floor",
         label: "floor(argument)",
         insertText: "floor(${1:argument})",
         documentation: "Returns the largest integer that is less than or equal to the argument, fuzzed to avoid unexpected floating-point results.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "floorz",
         label: "floorz(argument)",
         insertText: "floorz(${1:argument})",
         documentation: "Returns the largest integer that is less than or equal to the argument, using zero fuzzing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fmtinfo",
         label: "fmtinfo(fmtname, CAT, TYPE, DESC, MIND, MAXD, DEFD, MINW, MAXW, DEFW)",
         insertText: "fmtinfo(${1:fmtname}, ${2:CAT}, ${3:TYPE}, ${4:DESC}, ${5:MIND}, ${6:MAXD}, ${7:DEFD}, ${8:MINW}, ${9:MAXW}, ${10:DEFW})",
         documentation: "Retrieves information about a format or informat.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fnonct",
         label: "fnonct(x, ndf, ddf, probability)",
         insertText: "fnonct(${1:x}, ${2:ndf}, ${3:ddf}, ${4:probability})",
         documentation: "Returns the value of the noncentrality parameter of an F distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fnote",
         label: "fnote(file-id)",
         insertText: "fnote(${1:file-id})",
         documentation: "Identifies the last record that was read, and returns a value that the FPOINT function can use.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fopen",
         label: "fopen(fileref, open-mode, record-length, record-format)",
         insertText: "fopen(${1:fileref}, ${2:open-mode}, ${3:record-length}, ${4:record-format})",
         documentation: "Opens an external file and returns a file identifier value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "foptname",
         label: "foptname(file-id, nval)",
         insertText: "foptname(${1:file-id}, ${2:nval})",
         documentation: "Returns the name of an item of information about an external file.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "foptnum",
         label: "foptnum(file-id)",
         insertText: "foptnum(${1:file-id})",
         documentation: "Returns the number of information items, such as filename or record length, that are available for an external file.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fpoint",
         label: "fpoint(file-id, note-id)",
         insertText: "fpoint(${1:file-id}, ${2:note-id})",
         documentation: "Positions the read pointer on the next record to be read.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fpos",
         label: "fpos(file-id, nval)",
         insertText: "fpos(${1:file-id}, ${2:nval})",
         documentation: "Sets the position of the column pointer in the File Data Buffer (FDB).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fput",
         label: "fput(file-id, cval)",
         insertText: "fput(${1:file-id}, ${2:cval})",
         documentation: "Moves data to the File Data Buffer (FDB) of an external file, starting at the FDB's current column position.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fread",
         label: "fread(file-id)",
         insertText: "fread(${1:file-id})",
         documentation: "Reads a record from an external file into the File Data Buffer (FDB).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "frewind",
         label: "frewind(file-id)",
         insertText: "frewind(${1:file-id})",
         documentation: "Positions the file pointer to the start of the file.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "frlen",
         label: "frlen(file-id)",
         insertText: "frlen(${1:file-id})",
         documentation: "Returns the size of the last record that was read, or, if the file is opened for output, returns the current record size.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fsep",
         label: "fsep(file-id, character, 'x', 'X')",
         insertText: "fsep(${1:file-id}, ${2:character}, ${3:'x'}, ${4:'X'})",
         documentation: "Sets the token delimiters for the FGET function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fuzz",
         label: "fuzz(argument)",
         insertText: "fuzz(${1:argument})",
         documentation: "Returns the nearest integer if the argument is within 1E\u221212 of that integer.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "fwrite",
         label: "fwrite(file-id, cc)",
         insertText: "fwrite(${1:file-id}, ${2:cc})",
         documentation: "Writes a record to an external file.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "gaminv",
         label: "gaminv(p, a)",
         insertText: "gaminv(${1:p}, ${2:a})",
         documentation: "Returns a quantile from the gamma distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "gamma",
         label: "gamma(argument)",
         insertText: "gamma(${1:argument})",
         documentation: "Returns the value of the gamma function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "garkhclprc",
         label: "garkhclprc(E, t, S, Rd, Rf, sigma)",
         insertText: "garkhclprc(${1:E}, ${2:t}, ${3:S}, ${4:Rd}, ${5:Rf}, ${6:sigma})",
         documentation: "Calculates call prices for European options on stocks, based on the Garman-Kohlhagen model.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "garkhptprc",
         label: "garkhptprc(E, t, S, Rd, Rf, sigma)",
         insertText: "garkhptprc(${1:E}, ${2:t}, ${3:S}, ${4:Rd}, ${5:Rf}, ${6:sigma})",
         documentation: "Calculates put prices for European options on stocks, based on the Garman-Kohlhagen model.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "gcd",
         label: "gcd(x)",
         insertText: "gcd(${1:x})",
         documentation: "Returns the greatest common divisor for one or more integers.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "geodist",
         label: "geodist(latitude-1, latitude-2, longitude-1, longitude-2, M, K, D, R)",
         insertText: "geodist(${1:latitude-1}, ${2:latitude-2}, ${3:longitude-1}, ${4:longitude-2}, ${5:M}, ${6:K}, ${7:D}, ${8:R})",
         documentation: "Returns the geodetic distance between two latitude and longitude coordinates.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "geomean",
         label: "geomean(argument)",
         insertText: "geomean(${1:argument})",
         documentation: "Returns the geometric mean.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "geomeanz",
         label: "geomeanz(argument)",
         insertText: "geomeanz(${1:argument})",
         documentation: "Returns the geometric mean, using zero fuzzing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getcasurl",
         label: "getcasurl(session)",
         insertText: "getcasurl(${1:session})",
         documentation: "Returns the value for a URL for connecting to the CAS Server Monitor.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getlcaslib",
         label: "getlcaslib(libref)",
         insertText: "getlcaslib(${1:libref})",
         documentation: "Returns the caslib that was bound to a CAS LIBNAME engine libref using the CASLIB= option when it was assigned.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getlsessref",
         label: "getlsessref(libref)",
         insertText: "getlsessref(${1:libref})",
         documentation: "Returns the session reference that is associated with a CAS LIBNAME engine libref.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getltag",
         label: "getltag(libref)",
         insertText: "getltag(${1:libref})",
         documentation: "Returns the tag that was associated with a CAS LIBNAME engine libref in the TAG= option when it is assigned.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getoption",
         label: "getoption(option-name, DEFAULTVALUE, HOWSCOPE, HOWSET, STARTUPVALUE, CM, EXPAND, KEYEXPAND, KEYWORD, HEXVALUE, IN, LOGNUMBERFORMAT)",
         insertText: "getoption(${1:option-name}, ${2:DEFAULTVALUE}, ${3:HOWSCOPE}, ${4:HOWSET}, ${5:STARTUPVALUE}, ${6:CM}, ${7:EXPAND}, ${8:KEYEXPAND}, ${9:KEYWORD}, ${10:HEXVALUE}, ${11:IN}, ${12:LOGNUMBERFORMAT})",
         documentation: "Returns the value of a SAS system or graphics option.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getpxlocale",
         label: "getpxlocale(<source>)",
         insertText: "getpxlocale(${1:<source>})",
         documentation: "Returns the POSIX locale value for a SAS locale.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getsessopt",
         label: "getsessopt(session-reference, session-option-name, uuid)",
         insertText: "getsessopt(${1:session-reference}, ${2:session-option-name}, ${3:uuid})",
         documentation: "Returns the value for a SAS Cloud Analytic Services session option.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getvarc",
         label: "getvarc(data-set-id, variable-number)",
         insertText: "getvarc(${1:data-set-id}, ${2:variable-number})",
         documentation: "Returns the value of a SAS data set character variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "getvarn",
         label: "getvarn(data-set-id, variable-number)",
         insertText: "getvarn(${1:data-set-id}, ${2:variable-number})",
         documentation: "Returns the value of a SAS data set numeric variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "graycode",
         label: "graycode(k, numeric-variable, character-variable, n, in-out)",
         insertText: "graycode(${1:k}, ${2:numeric-variable}, ${3:character-variable}, ${4:n}, ${5:in-out})",
         documentation: "Generates all subsets of n items in a minimal change order.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "harmean",
         label: "harmean(argument)",
         insertText: "harmean(${1:argument})",
         documentation: "Returns the harmonic mean.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "harmeanz",
         label: "harmeanz(argument)",
         insertText: "harmeanz(${1:argument})",
         documentation: "Returns the harmonic mean, using zero fuzzing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hashing",
         label: "hashing(method, message, flag)",
         insertText: "hashing(${1:method}, ${2:message}, ${3:flag})",
         documentation: "Returns a message digest as a hexadecimal string for a message consisting of a character string, using different methods.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hashing_file",
         label: "hashing_file(method, file, flag)",
         insertText: "hashing_file(${1:method}, ${2:file}, ${3:flag})",
         documentation: "Returns a message digest as a hexadecimal string for a message consisting of an entire file, using different hashing methods.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hashing_hmac",
         label: "hashing_hmac(method, key, message, flag)",
         insertText: "hashing_hmac(${1:method}, ${2:key}, ${3:message}, ${4:flag})",
         documentation: "Returns a message digest as a hexadecimal string for a character HMAC key value and a message consisting of a character string, using various methods.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hashing_hmac_file",
         label: "hashing_hmac_file(method, key, file, flag)",
         insertText: "hashing_hmac_file(${1:method}, ${2:key}, ${3:file}, ${4:flag})",
         documentation: "Returns a message digest as a hexadecimal string for an HMAC key value consisting of a character string and a message consisting of an entire file, using different methods.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hashing_hmac_init",
         label: "hashing_hmac_init(method, key, flag)",
         insertText: "hashing_hmac_init(${1:method}, ${2:key}, ${3:flag})",
         documentation: "Initializes a running HMAC hash and returns a numeric handle for use with HASHING_PART and HASHING_TERM.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hashing_init",
         label: "hashing_init(method)",
         insertText: "hashing_init(${1:method})",
         documentation: "Initializes a running hash and returns a numeric handle for use with HASHING_PART and HASHING_TERM.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hashing_part",
         label: "hashing_part(handle, message_part, flag)",
         insertText: "hashing_part(${1:handle}, ${2:message_part}, ${3:flag})",
         documentation: "Provides part of a message for a running hash and returns a numeric value of 1 for a valid handle.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hashing_term",
         label: "hashing_term(handle)",
         insertText: "hashing_term(${1:handle})",
         documentation: "Returns the final digest in hexadecimal representation for the running hash.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hash_fast_hex",
         label: "hash_fast_hex(key, arg1,)",
         insertText: "hash_fast_hex(${1:key}, ${2:arg1,})",
         documentation: "Returns a message digest as a 16-byte hexadecimal string for a key value and a message consisting of one or more character strings or numbers, using the fast-hash algorithm.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hash_xx_hex",
         label: "hash_xx_hex(key, arg1,)",
         insertText: "hash_xx_hex(${1:key}, ${2:arg1,})",
         documentation: "Returns a message digest as a 16-byte hexadecimal string for a key value and a message consisting of one or more character strings or numbers.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hbound",
         label: "hbound(array-name, bound-n, n)",
         insertText: "hbound(${1:array-name}, ${2:bound-n}, ${3:n})",
         documentation: "Returns the upper bound of an array.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hms",
         label: "hms(hour, minute, second)",
         insertText: "hms(${1:hour}, ${2:minute}, ${3:second})",
         documentation: "Returns a SAS time value from hour, minute, and second values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "holiday",
         label: "holiday('holiday', year)",
         insertText: "holiday(${1:'holiday'}, ${2:year})",
         documentation: "Returns a SAS date value of a specified holiday for a specified year.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "holidayck",
         label: "holidayck('holiday', date1, date2, 'locale')",
         insertText: "holidayck(${1:'holiday'}, ${2:date1}, ${3:date2}, ${4:'locale'})",
         documentation: "Returns the number of occurrences of the holiday value between date1 and date2.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "holidaycount",
         label: "holidaycount(date, 'locale')",
         insertText: "holidaycount(${1:date}, ${2:'locale'})",
         documentation: "Returns the number of holidays defined for a SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "holidayname",
         label: "holidayname(date, n, 'locale')",
         insertText: "holidayname(${1:date}, ${2:n}, ${3:'locale'})",
         documentation: "Returns the name of the holiday that corresponds to the SAS date or a blank string if a holiday is not defined for the SAS date.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "holidaynx",
         label: "holidaynx('holiday', date, n, 'locale')",
         insertText: "holidaynx(${1:'holiday'}, ${2:date}, ${3:n}, ${4:'locale'})",
         documentation: "Returns the nth occurrence of the holiday relative to the date argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "holidayny",
         label: "holidayny('holiday', year, n, 'locale')",
         insertText: "holidayny(${1:'holiday'}, ${2:year}, ${3:n}, ${4:'locale'})",
         documentation: "Returns the nth occurrence of the holiday for the year.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "holidaytest",
         label: "holidaytest('holiday', date, 'locale')",
         insertText: "holidaytest(${1:'holiday'}, ${2:date}, ${3:'locale'})",
         documentation: "Returns 1 if the holiday occurs on the SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "hour",
         label: "hour(time, datetime)",
         insertText: "hour(${1:time}, ${2:datetime})",
         documentation: "Returns the hour from a SAS time or datetime value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "htmldecode",
         label: "htmldecode(expression)",
         insertText: "htmldecode(${1:expression})",
         documentation: "Decodes a string that contains HTML numeric character references or HTML character entity references, and returns the decoded string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "htmlencode",
         label: "htmlencode(expression, option)",
         insertText: "htmlencode(${1:expression}, ${2:option})",
         documentation: "Encodes characters using HTML character entity references, and returns the encoded string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ibessel",
         label: "ibessel(nu, x, kode)",
         insertText: "ibessel(${1:nu}, ${2:x}, ${3:kode})",
         documentation: "Returns the value of the modified Bessel function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ifc",
         label: "ifc(logical-expression, value-returned-when-true, value-returned-when-false, value-returned-when-missing)",
         insertText: "ifc(${1:logical-expression}, ${2:value-returned-when-true}, ${3:value-returned-when-false}, ${4:value-returned-when-missing})",
         documentation: "Returns a character value based on whether an expression is true, false, or missing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ifn",
         label: "ifn(logical-expression, value-returned-when-true, value-returned-when-false, value-returned-when-missing)",
         insertText: "ifn(${1:logical-expression}, ${2:value-returned-when-true}, ${3:value-returned-when-false}, ${4:value-returned-when-missing})",
         documentation: "Returns a numeric value based on whether an expression is true, false, or missing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "index",
         label: "index(source, excerpt)",
         insertText: "index(${1:source}, ${2:excerpt})",
         documentation: "Searches a character expression for a string of characters, and returns the position of the string's first character for the first occurrence of the string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "indexc",
         label: "indexc(source, excerpt)",
         insertText: "indexc(${1:source}, ${2:excerpt})",
         documentation: "Searches a character expression for any of the specified characters, and returns the position of that character.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "indexw",
         label: "indexw(source, excerpt, delimiter)",
         insertText: "indexw(${1:source}, ${2:excerpt}, ${3:delimiter})",
         documentation: "Searches a character expression for a string that is specified as a word, and returns the position of the first character in the word.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "input",
         label: "input(source, ?, informat.)",
         insertText: "input(${1:source}, ${2:?}, ${3:informat.})",
         documentation: "Returns the value that is produced when SAS converts an expression by using the specified informat.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "inputc",
         label: "inputc(source, informat, w)",
         insertText: "inputc(${1:source}, ${2:informat}, ${3:w})",
         documentation: "Enables you to specify a character informat at run time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "inputn",
         label: "inputn(source, informat, w, d)",
         insertText: "inputn(${1:source}, ${2:informat}, ${3:w}, ${4:d})",
         documentation: "Enables you to specify a numeric informat at run time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "int",
         label: "int(argument)",
         insertText: "int(${1:argument})",
         documentation: "Returns the integer value, fuzzed to avoid unexpected floating-point results.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intcindex",
         label: "intcindex(interval, multiple, shift-index, date-time-value)",
         insertText: "intcindex(${1:interval}, ${2:multiple}, ${3:shift-index}, ${4:date-time-value})",
         documentation: "Returns the cycle index when a date, time, or datetime interval and value are specified.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intck",
         label: "intck(interval, multiple, custom-interval, shift-index, start-date, end-date, CONTINUOUS, DISCRETE)",
         insertText: "intck(${1:interval}, ${2:multiple}, ${3:custom-interval}, ${4:shift-index}, ${5:start-date}, ${6:end-date}, ${7:CONTINUOUS}, ${8:DISCRETE})",
         documentation: "Returns the number of interval boundaries of a given kind that lie between two dates, times, or datetime values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intcycle",
         label: "intcycle(interval, interval, multiple, shift-index, seasonality)",
         insertText: "intcycle(${1:interval}, ${2:interval}, ${3:multiple}, ${4:shift-index}, ${5:seasonality})",
         documentation: "Returns the date, time, or datetime interval at the next higher seasonal cycle when a date, time, or datetime interval is specified.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intfit",
         label: "intfit(argument, 'type')",
         insertText: "intfit(${1:argument}, ${2:'type'})",
         documentation: "Returns a time interval that is aligned between two dates.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intfmt",
         label: "intfmt(interval, multiple, shift-index, 'size')",
         insertText: "intfmt(${1:interval}, ${2:multiple}, ${3:shift-index}, ${4:'size'})",
         documentation: "Returns a recommended SAS format when a date, time, or datetime interval is specified.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intget",
         label: "intget(date)",
         insertText: "intget(${1:date})",
         documentation: "Returns a time interval based on three date or datetime values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intindex",
         label: "intindex(interval, multiple, shift-index, date-value, seasonality)",
         insertText: "intindex(${1:interval}, ${2:multiple}, ${3:shift-index}, ${4:date-value}, ${5:seasonality})",
         documentation: "Returns the seasonal index when a date, time, or datetime interval and value are specified.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intnx",
         label: "intnx(interval, multiple, shift-index, start-from, increment, BEGINNING, MIDDLE, END, SAME, custom-interval)",
         insertText: "intnx(${1:interval}, ${2:multiple}, ${3:shift-index}, ${4:start-from}, ${5:increment}, ${6:BEGINNING}, ${7:MIDDLE}, ${8:END}, ${9:SAME}, ${10:custom-interval})",
         documentation: "Increments a date, time, or datetime value by a given time interval, and returns a date, time, or datetime value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intrr",
         label: "intrr(frequency, c0,)",
         insertText: "intrr(${1:frequency}, ${2:c0,})",
         documentation: "Returns the internal rate of return as a fraction.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intseas",
         label: "intseas(interval, multiple, shift-index, seasonality)",
         insertText: "intseas(${1:interval}, ${2:multiple}, ${3:shift-index}, ${4:seasonality})",
         documentation: "Returns the length of the seasonal cycle when a date, time, or datetime interval is specified.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intshift",
         label: "intshift(interval, interval, multiple, shift-index)",
         insertText: "intshift(${1:interval}, ${2:interval}, ${3:multiple}, ${4:shift-index})",
         documentation: "Returns the shift interval that corresponds to the base interval.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "inttest",
         label: "inttest(interval, multiple, shift-index)",
         insertText: "inttest(${1:interval}, ${2:multiple}, ${3:shift-index})",
         documentation: "Returns 1 if a time interval is valid, and returns 0 if a time interval is invalid.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "intz",
         label: "intz(argument)",
         insertText: "intz(${1:argument})",
         documentation: "Returns the integer portion of the argument, using zero fuzzing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "invcdf",
         label: "invcdf(quantile, 'CDF-function-name', initial-value, desired-accuracy, domain-type, <=0, 1, cumulative-probability, parameter)",
         insertText: "invcdf(${1:quantile}, ${2:'CDF-function-name'}, ${3:initial-value}, ${4:desired-accuracy}, ${5:domain-type}, ${6:<=0}, ${7:1}, ${8:cumulative-probability}, ${9:parameter})",
         documentation: "Computes the quantile from any distribution for which you have defined a cumulative distribution function (CDF).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ipmt",
         label: "ipmt(rate, period, number-of-periods, principal-amount, future-amount, type)",
         insertText: "ipmt(${1:rate}, ${2:period}, ${3:number-of-periods}, ${4:principal-amount}, ${5:future-amount}, ${6:type})",
         documentation: "Returns the interest payment for a given period for a constant payment loan or the periodic savings for a future balance.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "iqr",
         label: "iqr(value)",
         insertText: "iqr(${1:value})",
         documentation: "Returns the interquartile range.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "irr",
         label: "irr(frequency, c1,)",
         insertText: "irr(${1:frequency}, ${2:c1,})",
         documentation: "Returns the internal rate of return as a percentage.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "isnull",
         label: "isnull(numeric-variable, pointer-element)",
         insertText: "isnull(${1:numeric-variable}, ${2:pointer-element})",
         documentation: "Determines whether a pointer element of a structure is null.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "jbessel",
         label: "jbessel(nu, x)",
         insertText: "jbessel(${1:nu}, ${2:x})",
         documentation: "Returns the value of the Bessel function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "jsonpp",
         label: "jsonpp(input, output)",
         insertText: "jsonpp(${1:input}, ${2:output})",
         documentation: "Creates a readable copy of JSON input.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "juldate",
         label: "juldate(date)",
         insertText: "juldate(${1:date})",
         documentation: "Returns the Julian date from a SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "juldate7",
         label: "juldate7(date)",
         insertText: "juldate7(${1:date})",
         documentation: "Returns a seven-digit Julian date from a SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kcharlist",
         label: "kcharlist(modifier)",
         insertText: "kcharlist(${1:modifier})",
         documentation: "Returns the character list according to the modifier.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kcompare",
         label: "kcompare(source, findstr, pos, modifiers, count)",
         insertText: "kcompare(${1:source}, ${2:findstr}, ${3:pos}, ${4:modifiers}, ${5:count})",
         documentation: "Returns the result of a comparison of character expressions.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kcompress",
         label: "kcompress(source, characters-to-remove, modifier)",
         insertText: "kcompress(${1:source}, ${2:characters-to-remove}, ${3:modifier})",
         documentation: "Removes specified characters from a character expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kcount",
         label: "kcount(source)",
         insertText: "kcount(${1:source})",
         documentation: "Returns the number of double-byte characters in an expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kcountc",
         label: "kcountc(string, character-list, modifer)",
         insertText: "kcountc(${1:string}, ${2:character-list}, ${3:modifer})",
         documentation: "counts individual characters in a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kcountw",
         label: "kcountw(string, character-list, modifier)",
         insertText: "kcountw(${1:string}, ${2:character-list}, ${3:modifier})",
         documentation: "Counts the number of words in a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kcountx",
         label: "kcountx(string, substring, modifier)",
         insertText: "kcountx(${1:string}, ${2:substring}, ${3:modifier})",
         documentation: "Counts the number of times that a specified substring appears within a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kcvt",
         label: "kcvt(text, intype, outtype, options)",
         insertText: "kcvt(${1:text}, ${2:intype}, ${3:outtype}, ${4:options})",
         documentation: "Converts data from one type of encoding data to another type of encoding data.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kfind",
         label: "kfind(string, substring, i, t, start-position)",
         insertText: "kfind(${1:string}, ${2:substring}, ${3:i}, ${4:t}, ${5:start-position})",
         documentation: "Searches for a specific substring of characters within a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kfindc",
         label: "kfindc(string, character-list, modifier, start-position)",
         insertText: "kfindc(${1:string}, ${2:character-list}, ${3:modifier}, ${4:start-position})",
         documentation: "Searches a string for any character in a list of characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kfindw",
         label: "kfindw(string, word, character-list, start-position, modifier)",
         insertText: "kfindw(${1:string}, ${2:word}, ${3:character-list}, ${4:start-position}, ${5:modifier})",
         documentation: "Returns the character position of a word in a string or the number of the word in a string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kindex",
         label: "kindex(source, excerpt)",
         insertText: "kindex(${1:source}, ${2:excerpt})",
         documentation: "Searches a character expression for a string of characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kindexb",
         label: "kindexb(source, excerpt)",
         insertText: "kindexb(${1:source}, ${2:excerpt})",
         documentation: "Searches a character expression for specified characters and returns byte-based values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kindexc",
         label: "kindexc(source, excerpt-1,)",
         insertText: "kindexc(${1:source}, ${2:excerpt-1,})",
         documentation: "Searches a character expression for specified characters and returns character-based values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kindexcb",
         label: "kindexcb(source, excerpt-1,)",
         insertText: "kindexcb(${1:source}, ${2:excerpt-1,})",
         documentation: "Searches a character expression for specified characters and returns byte-based values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kleft",
         label: "kleft(argument)",
         insertText: "kleft(${1:argument})",
         documentation: "Left-aligns a character expression by removing unnecessary leading DBCS blanks and SO/SI.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "klength",
         label: "klength(argument)",
         insertText: "klength(${1:argument})",
         documentation: "Returns the length, in characters, of an argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "klowcase",
         label: "klowcase(argument)",
         insertText: "klowcase(${1:argument})",
         documentation: "Converts the uppercase alphabetic letters to lowercase letters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "knextchar",
         label: "knextchar(text, offset)",
         insertText: "knextchar(${1:text}, ${2:offset})",
         documentation: "Returns a character from a string at a specified byte offset.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "koffset",
         label: "koffset(text, character_position)",
         insertText: "koffset(${1:text}, ${2:character_position})",
         documentation: "Returns the byte offset from the character position.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kpropcase",
         label: "kpropcase(str, instr, HALF-KATAKANA,, FULL-KATAKANA,, KATAKANA,, ROMAJI,, FULL-ALPHABET,, HALF-ALPHABET,, LOWERCASE,, UPPERCASE,, PROPER)",
         insertText: "kpropcase(${1:str}, ${2:instr}, ${3:HALF-KATAKANA,}, ${4:FULL-KATAKANA,}, ${5:KATAKANA,}, ${6:ROMAJI,}, ${7:FULL-ALPHABET,}, ${8:HALF-ALPHABET,}, ${9:LOWERCASE,}, ${10:UPPERCASE,}, ${11:PROPER})",
         documentation: "Converts Chinese, Japanese, Korean, Taiwanese (CJKT) characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kpropchar",
         label: "kpropchar(str, instr)",
         insertText: "kpropchar(${1:str}, ${2:instr})",
         documentation: "Converts Unicode to the corresponding characters enclosed in parenthesis.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kpropdata",
         label: "kpropdata(str, instr, UESC, TRIM, BLANK, QUESTION, HEX, TRUNCATE, REMOVE, NCR, PUNC, input, output)",
         insertText: "kpropdata(${1:str}, ${2:instr}, ${3:UESC}, ${4:TRIM}, ${5:BLANK}, ${6:QUESTION}, ${7:HEX}, ${8:TRUNCATE}, ${9:REMOVE}, ${10:NCR}, ${11:PUNC}, ${12:input}, ${13:output})",
         documentation: "Removes or converts unprintable characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kreverse",
         label: "kreverse(argument)",
         insertText: "kreverse(${1:argument})",
         documentation: "Reverses a character expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kright",
         label: "kright(argument)",
         insertText: "kright(${1:argument})",
         documentation: "Right-aligns a character expression by trimming trailing DBCS blanks and SO/SI.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kscan",
         label: "kscan(argument, n, delimiters)",
         insertText: "kscan(${1:argument}, ${2:n}, ${3:delimiters})",
         documentation: "Selects a specified word from a character expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kscanx",
         label: "kscanx(string, count, character-list, modifier)",
         insertText: "kscanx(${1:string}, ${2:count}, ${3:character-list}, ${4:modifier})",
         documentation: "Selects a specified word from a character expression using a modifier to process the function\u2019s action.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kstrcat",
         label: "kstrcat(argument)",
         insertText: "kstrcat(${1:argument})",
         documentation: "Concatenates two or more character expressions.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kstrip",
         label: "kstrip(string)",
         insertText: "kstrip(${1:string})",
         documentation: "Removes leading and trailing blanks from a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ksubstr",
         label: "ksubstr(argument, position, n)",
         insertText: "ksubstr(${1:argument}, ${2:position}, ${3:n})",
         documentation: "Extracts a substring from an argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ksubstrb",
         label: "ksubstrb(argument, position, n)",
         insertText: "ksubstrb(${1:argument}, ${2:position}, ${3:n})",
         documentation: "Extracts a substring from an argument according to the byte position of the substring in the argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ksubstrn",
         label: "ksubstrn(string, position, length)",
         insertText: "ksubstrn(${1:string}, ${2:position}, ${3:length})",
         documentation: "Returns a substring, allowing a result with a length of zero.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ktranslate",
         label: "ktranslate(source, to, from)",
         insertText: "ktranslate(${1:source}, ${2:to}, ${3:from})",
         documentation: "Replaces specified characters in a character expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ktrim",
         label: "ktrim(argument)",
         insertText: "ktrim(${1:argument})",
         documentation: "Removes trailing DBCS blanks and SO/SI from character expressions.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ktruncate",
         label: "ktruncate(argument, number, length)",
         insertText: "ktruncate(${1:argument}, ${2:number}, ${3:length})",
         documentation: "Truncates a string to a specified length in byte unit without breaking multibyte characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kupcase",
         label: "kupcase(argument)",
         insertText: "kupcase(${1:argument})",
         documentation: "Converts the lowercase alphabetic letters to uppercase letters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kupdate",
         label: "kupdate(argument, position, n, characters-to-replace)",
         insertText: "kupdate(${1:argument}, ${2:position}, ${3:n}, ${4:characters-to-replace})",
         documentation: "Replaces character value contents.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kupdateb",
         label: "kupdateb(argument, position, n, characters-to-replace)",
         insertText: "kupdateb(${1:argument}, ${2:position}, ${3:n}, ${4:characters-to-replace})",
         documentation: "Replaces the contents of the character value according to the byte position of the character value in the argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kupdates",
         label: "kupdates(argument, position, n, characters-to-replace)",
         insertText: "kupdates(${1:argument}, ${2:position}, ${3:n}, ${4:characters-to-replace})",
         documentation: "Replaces character value contents.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kurtosis",
         label: "kurtosis(argument)",
         insertText: "kurtosis(${1:argument})",
         documentation: "Returns the kurtosis.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kverify",
         label: "kverify(source, excerpt-1,)",
         insertText: "kverify(${1:source}, ${2:excerpt-1,})",
         documentation: "Returns the position of the first character (character-based value) that is unique to an expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "kverifyb",
         label: "kverifyb(source, excerpt)",
         insertText: "kverifyb(${1:source}, ${2:excerpt})",
         documentation: "Returns the position of the first character (byte-based value) that is unique to an expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lag",
         label: "lag(argument, n)",
         insertText: "lag(${1:argument}, ${2:n})",
         documentation: "Returns values from a queue.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "largest",
         label: "largest(k, value)",
         insertText: "largest(${1:k}, ${2:value})",
         documentation: "Returns the kth largest nonmissing value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lbound",
         label: "lbound(array-name, bound-n, n)",
         insertText: "lbound(${1:array-name}, ${2:bound-n}, ${3:n})",
         documentation: "Returns the lower bound of an array.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lcm",
         label: "lcm(x)",
         insertText: "lcm(${1:x})",
         documentation: "Returns the least common multiple.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lcomb",
         label: "lcomb(n, r)",
         insertText: "lcomb(${1:n}, ${2:r})",
         documentation: "Computes the logarithm of the COMB function, which is the logarithm of the number of combinations of n objects taken r at a time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "left",
         label: "left(argument)",
         insertText: "left(${1:argument})",
         documentation: "Left-aligns a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "length",
         label: "length(string)",
         insertText: "length(${1:string})",
         documentation: "Returns the length of bytes of a non-blank character string, excluding trailing blanks, and returns 1 for a blank character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lengthc",
         label: "lengthc(string)",
         insertText: "lengthc(${1:string})",
         documentation: "Returns the length of bytes in a character string, including trailing blanks.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lengthm",
         label: "lengthm(string)",
         insertText: "lengthm(${1:string})",
         documentation: "Returns the amount of memory, in bytes, that is allocated for a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lengthn",
         label: "lengthn(string)",
         insertText: "lengthn(${1:string})",
         documentation: "Returns the length of bytes in a character string, excluding trailing blanks.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lexcomb",
         label: "lexcomb(count, k, variable)",
         insertText: "lexcomb(${1:count}, ${2:k}, ${3:variable})",
         documentation: "Generates all distinct combinations of the nonmissing values of n variables taken k at a time in lexicographic order.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lexcombi",
         label: "lexcombi(n, K, index)",
         insertText: "lexcombi(${1:n}, ${2:K}, ${3:index})",
         documentation: "Generates all combinations of the indices of n objects taken k at a time in lexicographic order.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lexperk",
         label: "lexperk(count, k, variable)",
         insertText: "lexperk(${1:count}, ${2:k}, ${3:variable})",
         documentation: "Generates all distinct permutations of the nonmissing values of n variables taken k at a time in lexicographic order.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lexperm",
         label: "lexperm(count, variable)",
         insertText: "lexperm(${1:count}, ${2:variable})",
         documentation: "Generates all distinct permutations of the nonmissing values of several variables in lexicographic order.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lfact",
         label: "lfact(n)",
         insertText: "lfact(${1:n})",
         documentation: "Computes the logarithm of the FACT (factorial) function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lgamma",
         label: "lgamma(argument)",
         insertText: "lgamma(${1:argument})",
         documentation: "Returns the natural logarithm of the Gamma function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "libname",
         label: "libname(libref, SAS-library, engine, options)",
         insertText: "libname(${1:libref}, ${2:SAS-library}, ${3:engine}, ${4:options})",
         documentation: "Assigns or clears a libref for a SAS library.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "libref",
         label: "libref(libref)",
         insertText: "libref(${1:libref})",
         documentation: "Verifies that a libref has been assigned.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "limmoment",
         label: "limmoment(imom, 'CDF-function-name', desired-accuracy, initial-step-size, maximum-iterations, <=0, 1, order, limit, parameter)",
         insertText: "limmoment(${1:imom}, ${2:'CDF-function-name'}, ${3:desired-accuracy}, ${4:initial-step-size}, ${5:maximum-iterations}, ${6:<=0}, ${7:1}, ${8:order}, ${9:limit}, ${10:parameter})",
         documentation: "Computes the limited moment of any distribution for which you have defined a cumulative distribution function (CDF).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "log",
         label: "log(argument)",
         insertText: "log(${1:argument})",
         documentation: "Returns the natural (base e) logarithm.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "log10",
         label: "log10(argument)",
         insertText: "log10(${1:argument})",
         documentation: "Returns the logarithm to the base 10.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "log1px",
         label: "log1px(x)",
         insertText: "log1px(${1:x})",
         documentation: "Returns the log of 1 plus the argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "log2",
         label: "log2(argument)",
         insertText: "log2(${1:argument})",
         documentation: "Returns the logarithm to the base 2.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "logbeta",
         label: "logbeta(a, b)",
         insertText: "logbeta(${1:a}, ${2:b})",
         documentation: "Returns the logarithm of the beta function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "logcdf",
         label: "logcdf('distribution', quantile, parameter-1,)",
         insertText: "logcdf(${1:'distribution'}, ${2:quantile}, ${3:parameter-1,})",
         documentation: "Returns the logarithm of a left cumulative distribution function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "logistic",
         label: "logistic(argument)",
         insertText: "logistic(${1:argument})",
         documentation: "Returns the logistic transformation of the argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "logpdf",
         label: "logpdf('distribution', quantile, parameter-1,)",
         insertText: "logpdf(${1:'distribution'}, ${2:quantile}, ${3:parameter-1,})",
         documentation: "Returns the logarithm of a probability density (mass) function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "logsdf",
         label: "logsdf('distribution', quantile, parameter-1,)",
         insertText: "logsdf(${1:'distribution'}, ${2:quantile}, ${3:parameter-1,})",
         documentation: "Returns the logarithm of a survival function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lowcase",
         label: "lowcase(argument)",
         insertText: "lowcase(${1:argument})",
         documentation: "Converts all uppercase single-width English alphabet letters in an argument to lowercase.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lower",
         label: "lower(sql-expression)",
         insertText: "lower(${1:sql-expression})",
         documentation: "Converts the case of a character string to lowercase.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lperm",
         label: "lperm(n, r)",
         insertText: "lperm(${1:n}, ${2:r})",
         documentation: "Computes the logarithm of the PERM function, which is the logarithm of the number of permutations of n objects, with the option of including r number of elements.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "lpnorm",
         label: "lpnorm(p, value)",
         insertText: "lpnorm(${1:p}, ${2:value})",
         documentation: "Returns the Lp norm of the second argument and subsequent nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "mad",
         label: "mad(value)",
         insertText: "mad(${1:value})",
         documentation: "Returns the median absolute deviation from the median.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "margrclprc",
         label: "margrclprc(X1, t, X2, sigma-1, sigma-2, rho12)",
         insertText: "margrclprc(${1:X1}, ${2:t}, ${3:X2}, ${4:sigma-1}, ${5:sigma-2}, ${6:rho12})",
         documentation: "Calculates call prices for European options on stocks, based on the Margrabe model.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "margrptprc",
         label: "margrptprc(X1, t, X2, sigma-1, sigma-2, rho12)",
         insertText: "margrptprc(${1:X1}, ${2:t}, ${3:X2}, ${4:sigma-1}, ${5:sigma-2}, ${6:rho12})",
         documentation: "Calculates put prices for European options on stocks, based on the Margrabe model.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "max",
         label: "max(argument)",
         insertText: "max(${1:argument})",
         documentation: "Returns the largest value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "md5",
         label: "md5(message)",
         insertText: "md5(${1:message})",
         documentation: "Returns an MD5 message digest as a 16-byte binary string for a message consisting of a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "mdy",
         label: "mdy(month, day, year)",
         insertText: "mdy(${1:month}, ${2:day}, ${3:year})",
         documentation: "Returns a SAS date value from month, day, and year values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "mean",
         label: "mean(argument)",
         insertText: "mean(${1:argument})",
         documentation: "Returns the arithmetic mean (average).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "median",
         label: "median(value)",
         insertText: "median(${1:value})",
         documentation: "Returns the median value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "min",
         label: "min(argument)",
         insertText: "min(${1:argument})",
         documentation: "Returns the smallest value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "minute",
         label: "minute(time, datetime)",
         insertText: "minute(${1:time}, ${2:datetime})",
         documentation: "Returns the minute from a SAS time or datetime value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "missing",
         label: "missing(numeric-expression, character-expression)",
         insertText: "missing(${1:numeric-expression}, ${2:character-expression})",
         documentation: "Returns a numeric result that indicates whether the argument contains a missing value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "mod",
         label: "mod(argument-1, argument-2)",
         insertText: "mod(${1:argument-1}, ${2:argument-2})",
         documentation: "Returns the remainder from the division of the first argument by the second argument, fuzzed to avoid most unexpected floating-point results.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "modexist",
         label: "modexist('product-name', 'pathname')",
         insertText: "modexist(${1:'product-name'}, ${2:'pathname'})",
         documentation: "Determines whether a software image exists in the version of SAS that you have installed.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "module",
         label: "module(module, argument, control-string)",
         insertText: "module(${1:module}, ${2:argument}, ${3:control-string})",
         documentation: "Calls a specific routine or module that resides in an external dynamic link library (DLL).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "modz",
         label: "modz(argument-1, argument-2)",
         insertText: "modz(${1:argument-1}, ${2:argument-2})",
         documentation: "Returns the remainder from the division of the first argument by the second argument, using zero fuzzing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "month",
         label: "month(date)",
         insertText: "month(${1:date})",
         documentation: "Returns the month from a SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "mopen",
         label: "mopen(directory-id, member-name, open-mode, record-length, record-format)",
         insertText: "mopen(${1:directory-id}, ${2:member-name}, ${3:open-mode}, ${4:record-length}, ${5:record-format})",
         documentation: "Opens a file by directory ID and member name, and returns either the file identifier or a 0.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "mort",
         label: "mort(a, p, r, n)",
         insertText: "mort(${1:a}, ${2:p}, ${3:r}, ${4:n})",
         documentation: "Returns amortization parameters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "msplint",
         label: "msplint(X, n, X1,, Y1,, D1,)",
         insertText: "msplint(${1:X}, ${2:n}, ${3:X1,}, ${4:Y1,}, ${5:D1,})",
         documentation: "Returns the ordinate of a monotonicity-preserving interpolating spline.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "mvalid",
         label: "mvalid(libname, string, member-type, COMPAT, COMPATIBLE, EXTEND)",
         insertText: "mvalid(${1:libname}, ${2:string}, ${3:member-type}, ${4:COMPAT}, ${5:COMPATIBLE}, ${6:EXTEND})",
         documentation: "Checks the validity of a character string for use as a SAS member name.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "n",
         label: "n(argument)",
         insertText: "n(${1:argument})",
         documentation: "Returns the number of nonmissing numeric values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ndims",
         label: "ndims(array-name, rc)",
         insertText: "ndims(${1:array-name}, ${2:rc})",
         documentation: "Returns the number of dimensions in an array.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "netpv",
         label: "netpv(r, frequency, c0,)",
         insertText: "netpv(${1:r}, ${2:frequency}, ${3:c0,})",
         documentation: "Returns the net present value as a percent.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "nldate",
         label: "nldate(date, #, %%, %a, %A, %b, %B, %C, %d, %e, %F, %j, %m, %o, %u, %U, %V, %w, %W, %y, %Y)",
         insertText: "nldate(${1:date}, ${2:#}, ${3:%%}, ${4:%a}, ${5:%A}, ${6:%b}, ${7:%B}, ${8:%C}, ${9:%d}, ${10:%e}, ${11:%F}, ${12:%j}, ${13:%m}, ${14:%o}, ${15:%u}, ${16:%U}, ${17:%V}, ${18:%w}, ${19:%W}, ${20:%y}, ${21:%Y})",
         documentation: "Converts the SAS date value to the date value of the specified locale by using the date format descriptors.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "nldatm",
         label: "nldatm(datetime, #, %%, %a, %A, %b, %B, %c, %d, %e, %F, %H, %I, %j, %m, %M, %o, %p, %S, %u, %U, %V, %w, %W, %y, %Y)",
         insertText: "nldatm(${1:datetime}, ${2:#}, ${3:%%}, ${4:%a}, ${5:%A}, ${6:%b}, ${7:%B}, ${8:%c}, ${9:%d}, ${10:%e}, ${11:%F}, ${12:%H}, ${13:%I}, ${14:%j}, ${15:%m}, ${16:%M}, ${17:%o}, ${18:%p}, ${19:%S}, ${20:%u}, ${21:%U}, ${22:%V}, ${23:%w}, ${24:%W}, ${25:%y}, ${26:%Y})",
         documentation: "Converts the SAS datetime value to the time value of the specified locale by using the datetime-format descriptors.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "nliteral",
         label: "nliteral(string)",
         insertText: "nliteral(${1:string})",
         documentation: "Converts a character string that you specify to a SAS name literal.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "nltime",
         label: "nltime(time, datetime, #, %%, %H, %I, %M, %P, %S, startpos)",
         insertText: "nltime(${1:time}, ${2:datetime}, ${3:#}, ${4:%%}, ${5:%H}, ${6:%I}, ${7:%M}, ${8:%P}, ${9:%S}, ${10:startpos})",
         documentation: "Converts the SAS time or the datetime value to the time value of the specified locale by using the NLTIME descriptors.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "nmiss",
         label: "nmiss(argument)",
         insertText: "nmiss(${1:argument})",
         documentation: "Returns the number of missing numeric values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "nomrate",
         label: "nomrate(compounding-interval, rate)",
         insertText: "nomrate(${1:compounding-interval}, ${2:rate})",
         documentation: "Returns the nominal annual interest rate.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notalnum",
         label: "notalnum(string, start)",
         insertText: "notalnum(${1:string}, ${2:start})",
         documentation: "Searches a character string for a non-alphanumeric character, and returns the first position at which the character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notalpha",
         label: "notalpha(string, start)",
         insertText: "notalpha(${1:string}, ${2:start})",
         documentation: "Searches a character string for a nonalphabetic character, and returns the first position at which the character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notcntrl",
         label: "notcntrl(string, start)",
         insertText: "notcntrl(${1:string}, ${2:start})",
         documentation: "Searches a character string for a character that is not a control character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notdigit",
         label: "notdigit(string, start)",
         insertText: "notdigit(${1:string}, ${2:start})",
         documentation: "Searches a character string for any character that is not a digit, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "note",
         label: "note(data-set-id)",
         insertText: "note(${1:data-set-id})",
         documentation: "Returns an observation ID for the current observation of a SAS data set.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notfirst",
         label: "notfirst(string, start)",
         insertText: "notfirst(${1:string}, ${2:start})",
         documentation: "Searches a character string for an invalid first character in a SAS variable name under VALIDVARNAME=V7, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notgraph",
         label: "notgraph(string, start)",
         insertText: "notgraph(${1:string}, ${2:start})",
         documentation: "Searches a character string for a non-graphical character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notlower",
         label: "notlower(string, start)",
         insertText: "notlower(${1:string}, ${2:start})",
         documentation: "Searches a character string for a character that is not a lowercase letter, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notname",
         label: "notname(string, start)",
         insertText: "notname(${1:string}, ${2:start})",
         documentation: "Searches a character string for an invalid character in a SAS variable name under VALIDVARNAME=V7, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notprint",
         label: "notprint(string, start)",
         insertText: "notprint(${1:string}, ${2:start})",
         documentation: "Searches a character string for a nonprintable character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notpunct",
         label: "notpunct(string, start)",
         insertText: "notpunct(${1:string}, ${2:start})",
         documentation: "Searches a character string for a character that is not a punctuation character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notspace",
         label: "notspace(string, start)",
         insertText: "notspace(${1:string}, ${2:start})",
         documentation: "Searches a character string for a character that is not a whitespace character (blank, horizontal and vertical tab, carriage return, line feed, and form feed), and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notupper",
         label: "notupper(string, start)",
         insertText: "notupper(${1:string}, ${2:start})",
         documentation: "Searches a character string for a character that is not an uppercase letter, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "notxdigit",
         label: "notxdigit(string, start)",
         insertText: "notxdigit(${1:string}, ${2:start})",
         documentation: "Searches a character string for a character that is not a hexadecimal character, and returns the first position at which that character is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "npv",
         label: "npv(r, frequency, c0,)",
         insertText: "npv(${1:r}, ${2:frequency}, ${3:c0,})",
         documentation: "Returns the net present value with the rate expressed as a percentage.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "nvalid",
         label: "nvalid(string, V7, ANY, NLITERAL, UPCASE)",
         insertText: "nvalid(${1:string}, ${2:V7}, ${3:ANY}, ${4:NLITERAL}, ${5:UPCASE})",
         documentation: "Checks the validity of a character string for use as a SAS variable name.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "nwkdom",
         label: "nwkdom(n, weekday, month, year)",
         insertText: "nwkdom(${1:n}, ${2:weekday}, ${3:month}, ${4:year})",
         documentation: "Returns the date for the nth occurrence of a weekday for the specified month and year.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "open",
         label: "open(data-set-name, mode, generation-number, D, F)",
         insertText: "open(${1:data-set-name}, ${2:mode}, ${3:generation-number}, ${4:D}, ${5:F})",
         documentation: "Opens a SAS data set.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ordinal",
         label: "ordinal(k, argument)",
         insertText: "ordinal(${1:k}, ${2:argument})",
         documentation: "Returns the kth smallest of the missing and nonmissing values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "pathname",
         label: "pathname(fileref, libref, search-ref)",
         insertText: "pathname(${1:fileref}, ${2:libref}, ${3:search-ref})",
         documentation: "Returns the physical name of an external file or a SAS library, or returns a blank.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "pctl",
         label: "pctl(percentage, value, n)",
         insertText: "pctl(${1:percentage}, ${2:value}, ${3:n})",
         documentation: "Returns the percentile that corresponds to the percentage.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "pdf",
         label: "pdf(distribution, quantile, parameter-1,)",
         insertText: "pdf(${1:distribution}, ${2:quantile}, ${3:parameter-1,})",
         documentation: "Returns a value from a probability density (mass) distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "peekclong",
         label: "peekclong(address, length)",
         insertText: "peekclong(${1:address}, ${2:length})",
         documentation: "Stores the contents of a memory address in a character variable on a 64-bit platform.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "peeklong",
         label: "peeklong(address, length)",
         insertText: "peeklong(${1:address}, ${2:length})",
         documentation: "Stores the contents of a memory address in a numeric variable on a 64-bit platform.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "perm",
         label: "perm(n, r)",
         insertText: "perm(${1:n}, ${2:r})",
         documentation: "Computes the number of permutations of n items that are taken r at a time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "pmt",
         label: "pmt(rate, number-of-periods, principal-amount, future-amount, type)",
         insertText: "pmt(${1:rate}, ${2:number-of-periods}, ${3:principal-amount}, ${4:future-amount}, ${5:type})",
         documentation: "Returns the periodic payment for a constant payment loan or the periodic savings for a future balance.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "point",
         label: "point(data-set-id, note-id)",
         insertText: "point(${1:data-set-id}, ${2:note-id})",
         documentation: "Locates an observation that is identified by the NOTE function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "poisson",
         label: "poisson(m, n)",
         insertText: "poisson(${1:m}, ${2:n})",
         documentation: "Returns the probability from a Poisson distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ppmt",
         label: "ppmt(rate, period, number-of-periods, principal-amount, future-amount, type)",
         insertText: "ppmt(${1:rate}, ${2:period}, ${3:number-of-periods}, ${4:principal-amount}, ${5:future-amount}, ${6:type})",
         documentation: "Returns the principal payment for a given period for a constant payment loan or the periodic savings for a future balance.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probbeta",
         label: "probbeta(x, a, b)",
         insertText: "probbeta(${1:x}, ${2:a}, ${3:b})",
         documentation: "Returns the probability from a beta distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probbnml",
         label: "probbnml(p, n, m)",
         insertText: "probbnml(${1:p}, ${2:n}, ${3:m})",
         documentation: "Returns the probability from a binomial distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probbnrm",
         label: "probbnrm(x, y, r)",
         insertText: "probbnrm(${1:x}, ${2:y}, ${3:r})",
         documentation: "Returns a probability from a bivariate normal distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probchi",
         label: "probchi(x, df, nc)",
         insertText: "probchi(${1:x}, ${2:df}, ${3:nc})",
         documentation: "Returns the probability from a chi-square distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probf",
         label: "probf(x, ndf, ddf, nc)",
         insertText: "probf(${1:x}, ${2:ndf}, ${3:ddf}, ${4:nc})",
         documentation: "Returns the probability from an F distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probgam",
         label: "probgam(x, a)",
         insertText: "probgam(${1:x}, ${2:a})",
         documentation: "Returns the probability from a gamma distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probhypr",
         label: "probhypr(N, K, n, x, r)",
         insertText: "probhypr(${1:N}, ${2:K}, ${3:n}, ${4:x}, ${5:r})",
         documentation: "Returns the probability from a hypergeometric distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probit",
         label: "probit(p)",
         insertText: "probit(${1:p})",
         documentation: "Returns a quantile from the standard normal distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probmc",
         label: "probmc(distribution, q, prob, df, nparms, parameters)",
         insertText: "probmc(${1:distribution}, ${2:q}, ${3:prob}, ${4:df}, ${5:nparms}, ${6:parameters})",
         documentation: "Returns a probability or a quantile from various distributions for multiple comparisons of means.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probmed",
         label: "probmed(n, x)",
         insertText: "probmed(${1:n}, ${2:x})",
         documentation: "Computes cumulative probabilities for the sample median.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probnegb",
         label: "probnegb(p, n, m)",
         insertText: "probnegb(${1:p}, ${2:n}, ${3:m})",
         documentation: "Returns the probability from a negative binomial distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probnorm",
         label: "probnorm(x)",
         insertText: "probnorm(${1:x})",
         documentation: "Returns the probability from the standard normal distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "probt",
         label: "probt(x, df, nc)",
         insertText: "probt(${1:x}, ${2:df}, ${3:nc})",
         documentation: "Returns the probability from a t distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "propcase",
         label: "propcase(argument, delimiter)",
         insertText: "propcase(${1:argument}, ${2:delimiter})",
         documentation: "Converts all words in an argument to proper case.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "prxchange",
         label: "prxchange(perl-regular-expression, regular-expression-id, times, source)",
         insertText: "prxchange(${1:perl-regular-expression}, ${2:regular-expression-id}, ${3:times}, ${4:source})",
         documentation: "Performs a pattern-matching replacement.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "prxmatch",
         label: "prxmatch(regular-expression-id, perl-regular-expression, source)",
         insertText: "prxmatch(${1:regular-expression-id}, ${2:perl-regular-expression}, ${3:source})",
         documentation: "Searches for a pattern match and returns the position at which the pattern is found.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "prxparen",
         label: "prxparen(regular-expression-id)",
         insertText: "prxparen(${1:regular-expression-id})",
         documentation: "Returns the last bracket match for which there is a match in a pattern.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "prxparse",
         label: "prxparse(perl-regular-expression)",
         insertText: "prxparse(${1:perl-regular-expression})",
         documentation: "Compiles a Perl regular expression (PRX) that can be used for pattern matching of a character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "prxposn",
         label: "prxposn(regular-expression-id, capture-buffer, source)",
         insertText: "prxposn(${1:regular-expression-id}, ${2:capture-buffer}, ${3:source})",
         documentation: "Returns a character string that contains the value for a capture buffer.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ptrlongadd",
         label: "ptrlongadd(pointer, amount)",
         insertText: "ptrlongadd(${1:pointer}, ${2:amount})",
         documentation: "Returns the pointer address as a character variable on a 64-bit platform.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "put",
         label: "put(source, format.)",
         insertText: "put(${1:source}, ${2:format.})",
         documentation: "Returns a value using a specified format.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "putc",
         label: "putc(value, format-specification, w)",
         insertText: "putc(${1:value}, ${2:format-specification}, ${3:w})",
         documentation: "Enables you to specify a character format at run time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "putn",
         label: "putn(value, format-specification, w, d)",
         insertText: "putn(${1:value}, ${2:format-specification}, ${3:w}, ${4:d})",
         documentation: "Enables you to specify a numeric format at run time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "pvp",
         label: "pvp(A, c, n, K, k0, y)",
         insertText: "pvp(${1:A}, ${2:c}, ${3:n}, ${4:K}, ${5:k0}, ${6:y})",
         documentation: "Returns the present value for a periodic cash flow stream (such as a bond), with repayment of principal at maturity.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "qtr",
         label: "qtr(date)",
         insertText: "qtr(${1:date})",
         documentation: "Returns the quarter of the year from a SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "quantile",
         label: "quantile(distribution, probability, parameter-1,)",
         insertText: "quantile(${1:distribution}, ${2:probability}, ${3:parameter-1,})",
         documentation: "Returns the quantile from a distribution when you specify the left probability (CDF).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "quote",
         label: "quote(argument-1, argument-2)",
         insertText: "quote(${1:argument-1}, ${2:argument-2})",
         documentation: "Adds double quotation marks to a character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ranbin",
         label: "ranbin(seed, n, p)",
         insertText: "ranbin(${1:seed}, ${2:n}, ${3:p})",
         documentation: "Returns a random variate from a binomial distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rancau",
         label: "rancau(seed)",
         insertText: "rancau(${1:seed})",
         documentation: "Returns a random variate from a Cauchy distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rand",
         label: "rand(distribution, parameter-1,)",
         insertText: "rand(${1:distribution}, ${2:parameter-1,})",
         documentation: "Generates random numbers from a distribution that you specify.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ranexp",
         label: "ranexp(seed)",
         insertText: "ranexp(${1:seed})",
         documentation: "Returns a random variate from an exponential distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rangam",
         label: "rangam(seed, a)",
         insertText: "rangam(${1:seed}, ${2:a})",
         documentation: "Returns a random variate from a gamma distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "range",
         label: "range(argument)",
         insertText: "range(${1:argument})",
         documentation: "Returns the range of the nonmissing values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rank",
         label: "rank(x)",
         insertText: "rank(${1:x})",
         documentation: "Returns the position of a character in the ASCII collating sequence.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rannor",
         label: "rannor(seed)",
         insertText: "rannor(${1:seed})",
         documentation: "Returns a random variate from a normal distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ranpoi",
         label: "ranpoi(seed, m)",
         insertText: "ranpoi(${1:seed}, ${2:m})",
         documentation: "Returns a random variate from a Poisson distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rantbl",
         label: "rantbl(seed, pi)",
         insertText: "rantbl(${1:seed}, ${2:pi})",
         documentation: "Returns a random variate from a tabled probability distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rantri",
         label: "rantri(seed, h)",
         insertText: "rantri(${1:seed}, ${2:h})",
         documentation: "Returns a random variate from a triangular distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ranuni",
         label: "ranuni(seed)",
         insertText: "ranuni(${1:seed})",
         documentation: "Returns a random variate from a uniform distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "read_array",
         label: "read_array(rc, data_set_name, array_variable, column_name)",
         insertText: "read_array(${1:rc}, ${2:data_set_name}, ${3:array_variable}, ${4:column_name})",
         documentation: "Reads data from a SAS data set into a PROC FCMP array variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rename",
         label: "rename(old-name, new-name, type, description, password, generation)",
         insertText: "rename(${1:old-name}, ${2:new-name}, ${3:type}, ${4:description}, ${5:password}, ${6:generation})",
         documentation: "Renames a member of a SAS library, an entry in a SAS catalog, an external file, or a directory.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "repeat",
         label: "repeat(argument, n)",
         insertText: "repeat(${1:argument}, ${2:n})",
         documentation: "Returns a character value that consists of the first argument repeated n+1 times.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "resolve",
         label: "resolve('text-expression', character-variable-name, character-expression)",
         insertText: "resolve(${1:'text-expression'}, ${2:character-variable-name}, ${3:character-expression})",
         documentation: "Resolves the value of a text expression during DATA step execution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "reverse",
         label: "reverse(argument)",
         insertText: "reverse(${1:argument})",
         documentation: "Reverses a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rewind",
         label: "rewind(data-set-id)",
         insertText: "rewind(${1:data-set-id})",
         documentation: "Positions the data set pointer at the beginning of a SAS data set.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "right",
         label: "right(argument)",
         insertText: "right(${1:argument})",
         documentation: "Right aligns a character expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rms",
         label: "rms(argument)",
         insertText: "rms(${1:argument})",
         documentation: "Returns the root mean square of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "round",
         label: "round(argument, rounding-unit)",
         insertText: "round(${1:argument}, ${2:rounding-unit})",
         documentation: "Rounds the first argument to the nearest multiple of the second argument, or to the nearest integer when the second argument is omitted.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "rounde",
         label: "rounde(argument, rounding-unit)",
         insertText: "rounde(${1:argument}, ${2:rounding-unit})",
         documentation: "Rounds the first argument to the nearest multiple of the second argument, and returns an even multiple when the first argument is halfway between the two nearest multiples.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "roundz",
         label: "roundz(argument, rounding-unit)",
         insertText: "roundz(${1:argument}, ${2:rounding-unit})",
         documentation: "Rounds the first argument to the nearest multiple of the second argument, using zero fuzzing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "run_macro",
         label: "run_macro(rc, macro_name, variable)",
         insertText: "run_macro(${1:rc}, ${2:macro_name}, ${3:variable})",
         documentation: "Executes a predefined SAS macro.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "run_sasfile",
         label: "run_sasfile(rc, fileref_name, variable)",
         insertText: "run_sasfile(${1:rc}, ${2:fileref_name}, ${3:variable})",
         documentation: "Executes SAS code in a fileref that you specify.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sasmsg",
         label: "sasmsg(BASENAME, KEY, QUOTE, substitution)",
         insertText: "sasmsg(${1:BASENAME}, ${2:KEY}, ${3:QUOTE}, ${4:substitution})",
         documentation: "Specifies a message from a data set. The returned message is based on the current locale and a specified key.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sasmsgl",
         label: "sasmsgl(BASENAME, KEY, LOCALE, QUOTE, substitution)",
         insertText: "sasmsgl(${1:BASENAME}, ${2:KEY}, ${3:LOCALE}, ${4:QUOTE}, ${5:substitution})",
         documentation: "Specifies a message from a data set. The message is based on a specified locale value and a specified key value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "saving",
         label: "saving(f, p, r, n)",
         insertText: "saving(${1:f}, ${2:p}, ${3:r}, ${4:n})",
         documentation: "Returns the future value of a periodic saving.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "savings",
         label: "savings(base-date, initial-deposit-date, deposit-amount, deposit-number, deposit-interval, compounding-interval, date, rate)",
         insertText: "savings(${1:base-date}, ${2:initial-deposit-date}, ${3:deposit-amount}, ${4:deposit-number}, ${5:deposit-interval}, ${6:compounding-interval}, ${7:date}, ${8:rate})",
         documentation: "Returns the balance of a periodic savings by using variable interest rates.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "scan",
         label: "scan(string, count, character-list, modifier)",
         insertText: "scan(${1:string}, ${2:count}, ${3:character-list}, ${4:modifier})",
         documentation: "Returns the nth word from a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sdf",
         label: "sdf(distribution, quantile, parameter-1,)",
         insertText: "sdf(${1:distribution}, ${2:quantile}, ${3:parameter-1,})",
         documentation: "Returns a survival function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sec",
         label: "sec(argument)",
         insertText: "sec(${1:argument})",
         documentation: "Returns the secant.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "second",
         label: "second(time, datetime)",
         insertText: "second(${1:time}, ${2:datetime})",
         documentation: "Returns the seconds and milliseconds from a SAS time or datetime value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sessbusy",
         label: "sessbusy(session-reference, uuid)",
         insertText: "sessbusy(${1:session-reference}, ${2:uuid})",
         documentation: "Determines whether a CAS session is busy processing actions.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sessfound",
         label: "sessfound(session-reference, uuid)",
         insertText: "sessfound(${1:session-reference}, ${2:uuid})",
         documentation: "Returns a 0 when a CAS session is not connected to a server and a 1 when the session is connected to a server.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "setlocale",
         label: "setlocale(sas_locale, key, value, category_name)",
         insertText: "setlocale(${1:sas_locale}, ${2:key}, ${3:value}, ${4:category_name})",
         documentation: "Specifies the locale keys for the current SAS locale.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sha256",
         label: "sha256(message)",
         insertText: "sha256(${1:message})",
         documentation: "Returns an SHA256 message digest as a 32-byte binary string for a message consisting of a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sha256hex",
         label: "sha256hex('message', flag)",
         insertText: "sha256hex(${1:'message'}, ${2:flag})",
         documentation: "Returns the SHA256 digest for a specified message, and the digest is provided in hexadecimal representation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sha256hmachex",
         label: "sha256hmachex(key, message, flag)",
         insertText: "sha256hmachex(${1:key}, ${2:message}, ${3:flag})",
         documentation: "Returns the result of the message digest of a specified string using the HMAC algorithm.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sign",
         label: "sign(argument)",
         insertText: "sign(${1:argument})",
         documentation: "Returns the sign of a value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sin",
         label: "sin(argument)",
         insertText: "sin(${1:argument})",
         documentation: "Returns the sine.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sinh",
         label: "sinh(argument)",
         insertText: "sinh(${1:argument})",
         documentation: "Returns the hyperbolic sine.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "skewness",
         label: "skewness(argument)",
         insertText: "skewness(${1:argument})",
         documentation: "Returns the skewness of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sleep",
         label: "sleep(n, unit)",
         insertText: "sleep(${1:n}, ${2:unit})",
         documentation: "Suspends the execution of a program that invokes this function for a period of time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "smallest",
         label: "smallest(k, value)",
         insertText: "smallest(${1:k}, ${2:value})",
         documentation: "Returns the kth smallest nonmissing value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "solve",
         label: "solve(answer, 'function-name', initial-value, absolute-criterion, relative-criterion, maximum-iterations, solve-status, expected-value, argument)",
         insertText: "solve(${1:answer}, ${2:'function-name'}, ${3:initial-value}, ${4:absolute-criterion}, ${5:relative-criterion}, ${6:maximum-iterations}, ${7:solve-status}, ${8:expected-value}, ${9:argument})",
         documentation: "Computes implicit values of a function using the Gauss-Newton method.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sort",
         label: "sort(variable)",
         insertText: "sort(${1:variable})",
         documentation: "Sorts a list of variables.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sortkey",
         label: "sortkey(string, locale, strength, case, numeric, collation)",
         insertText: "sortkey(${1:string}, ${2:locale}, ${3:strength}, ${4:case}, ${5:numeric}, ${6:collation})",
         documentation: "Creates a linguistic sort key.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "soundex",
         label: "soundex(argument)",
         insertText: "soundex(${1:argument})",
         documentation: "Encodes a string to facilitate searching.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "spedis",
         label: "spedis(query, keyword)",
         insertText: "spedis(${1:query}, ${2:keyword})",
         documentation: "Determines the likelihood of two words matching, expressed as the asymmetric spelling distance between the two words.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sqrt",
         label: "sqrt(argument)",
         insertText: "sqrt(${1:argument})",
         documentation: "Returns the square root of a value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "squantile",
         label: "squantile(distribution, probability, parameter-1,)",
         insertText: "squantile(${1:distribution}, ${2:probability}, ${3:parameter-1,})",
         documentation: "Returns the quantile from a distribution when you specify the right probability (SDF).",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "std",
         label: "std(argument)",
         insertText: "std(${1:argument})",
         documentation: "Returns the standard deviation of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "stderr",
         label: "stderr(argument)",
         insertText: "stderr(${1:argument})",
         documentation: "Returns the standard error of the mean of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "stfips",
         label: "stfips(postal-code)",
         insertText: "stfips(${1:postal-code})",
         documentation: "Converts state postal codes to FIPS state codes.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "stname",
         label: "stname(postal-code)",
         insertText: "stname(${1:postal-code})",
         documentation: "Converts state postal codes to uppercase state names.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "stnamel",
         label: "stnamel(postal-code)",
         insertText: "stnamel(${1:postal-code})",
         documentation: "Converts state postal codes to mixed case state names.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "strip",
         label: "strip(string)",
         insertText: "strip(${1:string})",
         documentation: "Returns a character string with all leading and trailing blanks removed.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "subpad",
         label: "subpad(string, position, length)",
         insertText: "subpad(${1:string}, ${2:position}, ${3:length})",
         documentation: "Returns a substring that has a length that you specify, using blank padding if necessary.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "substring",
         label: "substring(sql-expression, start, length)",
         insertText: "substring(${1:sql-expression}, ${2:start}, ${3:length})",
         documentation: "Returns a part of a character expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "substrn",
         label: "substrn(string, position, length)",
         insertText: "substrn(${1:string}, ${2:position}, ${3:length})",
         documentation: "Returns a substring, allowing a result with a length of zero.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sum",
         label: "sum(argument)",
         insertText: "sum(${1:argument})",
         documentation: "Returns the sum of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sumabs",
         label: "sumabs(value)",
         insertText: "sumabs(${1:value})",
         documentation: "Returns the sum of the absolute values of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "symexist",
         label: "symexist('macro-variable-name', character-variable-name, character-expression)",
         insertText: "symexist(${1:'macro-variable-name'}, ${2:character-variable-name}, ${3:character-expression})",
         documentation: "Returns an indication of the existence of a macro variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "symget",
         label: "symget('macro-variable-name', character-variable-name, character-expression)",
         insertText: "symget(${1:'macro-variable-name'}, ${2:character-variable-name}, ${3:character-expression})",
         documentation: "Returns the value of a macro variable to the DATA step during DATA step execution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "symgetn",
         label: "symgetn('global-macro-variable-name', SCL-variable-name)",
         insertText: "symgetn(${1:'global-macro-variable-name'}, ${2:SCL-variable-name})",
         documentation: "In SAS Component Control Language (SCL) programs, returns the value of a global macro variable as a numeric value when the SCL program executes.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "symglobl",
         label: "symglobl('macro-variable-name', character-variable-name, character-expression)",
         insertText: "symglobl(${1:'macro-variable-name'}, ${2:character-variable-name}, ${3:character-expression})",
         documentation: "Returns an indication as to whether a macro variable is global in scope to the DATA step during DATA step execution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "symlocal",
         label: "symlocal('macro-variable-name', character-variable-name, character-expression)",
         insertText: "symlocal(${1:'macro-variable-name'}, ${2:character-variable-name}, ${3:character-expression})",
         documentation: "Returns an indication as to whether a macro variable is local in scope to the DATA step during DATA step execution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sysexist",
         label: "sysexist(argument)",
         insertText: "sysexist(${1:argument})",
         documentation: "Returns a value that indicates whether an operating-environment variable exists in your environment.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sysget",
         label: "sysget(environment-variable)",
         insertText: "sysget(${1:environment-variable})",
         documentation: "Returns the value of the specified operating-environment variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sysprocessname",
         label: "sysprocessname(process_id)",
         insertText: "sysprocessname(${1:process_id})",
         documentation: "Returns the process name that is associated with a given process ID, or returns the name of the current process.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sysprod",
         label: "sysprod(product-name)",
         insertText: "sysprod(${1:product-name})",
         documentation: "Determines whether a product is licensed.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "system",
         label: "system(command)",
         insertText: "system(${1:command})",
         documentation: "Issues an operating environment command during a SAS session, and returns the system return code.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tan",
         label: "tan(argument)",
         insertText: "tan(${1:argument})",
         documentation: "Returns the tangent.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tanh",
         label: "tanh(argument)",
         insertText: "tanh(${1:argument})",
         documentation: "Returns the hyperbolic tangent.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "timepart",
         label: "timepart(datetime)",
         insertText: "timepart(${1:datetime})",
         documentation: "Extracts a time value from a SAS datetime value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "timevalue",
         label: "timevalue(base-date, reference-date, reference-amount, compounding-interval, date, rate)",
         insertText: "timevalue(${1:base-date}, ${2:reference-date}, ${3:reference-amount}, ${4:compounding-interval}, ${5:date}, ${6:rate})",
         documentation: "Returns the equivalent of a reference amount at a base date by using variable interest rates.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tinv",
         label: "tinv(p, df, nc)",
         insertText: "tinv(${1:p}, ${2:df}, ${3:nc})",
         documentation: "Returns a quantile from the t distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tnonct",
         label: "tnonct(x, df, prob)",
         insertText: "tnonct(${1:x}, ${2:df}, ${3:prob})",
         documentation: "Returns the value of the noncentrality parameter from the Student's t distribution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "translate",
         label: "translate(source, to, from)",
         insertText: "translate(${1:source}, ${2:to}, ${3:from})",
         documentation: "Replaces specific characters in a character expression.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "transtrn",
         label: "transtrn(source, target, replacement)",
         insertText: "transtrn(${1:source}, ${2:target}, ${3:replacement})",
         documentation: "Replaces or removes all occurrences of a substring in a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "trantab",
         label: "trantab(string, trantab_name)",
         insertText: "trantab(${1:string}, ${2:trantab_name})",
         documentation: "Transcodes data by using the specified translation table.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tranwrd",
         label: "tranwrd(source, target, replacement)",
         insertText: "tranwrd(${1:source}, ${2:target}, ${3:replacement})",
         documentation: "Replaces all occurrences of a substring in a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "trigamma",
         label: "trigamma(argument)",
         insertText: "trigamma(${1:argument})",
         documentation: "Returns the value of the trigamma function.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "trim",
         label: "trim(argument)",
         insertText: "trim(${1:argument})",
         documentation: "Removes trailing blanks from a character string and returns one blank if the string is missing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "trimn",
         label: "trimn(argument)",
         insertText: "trimn(${1:argument})",
         documentation: "Removes trailing blanks from character expressions and returns a string with a length of zero if the expression is missing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "trunc",
         label: "trunc(number, length)",
         insertText: "trunc(${1:number}, ${2:length})",
         documentation: "Truncates a numeric value to a specified number of bytes.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tslvl",
         label: "tslvl(A, B, C, D, E, H, I, M, N, P, S, T, Z)",
         insertText: "tslvl(${1:A}, ${2:B}, ${3:C}, ${4:D}, ${5:E}, ${6:H}, ${7:I}, ${8:M}, ${9:N}, ${10:P}, ${11:S}, ${12:T}, ${13:Z})",
         documentation: "provides information about the specifics of the installation, including the release, hot fixes, and maintenance images.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "typeof",
         label: "typeof(C, N)",
         insertText: "typeof(${1:C}, ${2:N})",
         documentation: "Returns a value that indicates whether the argument is character or numeric.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzonedstname",
         label: "tzonedstname(time-zone-id)",
         insertText: "tzonedstname(${1:time-zone-id})",
         documentation: "Returns a daylight savings time name.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzonedstoff",
         label: "tzonedstoff(time-zone-id)",
         insertText: "tzonedstoff(${1:time-zone-id})",
         documentation: "Returns the time zone offset value for the specified daylight savings time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzoneid",
         label: "tzoneid(time-zone-id)",
         insertText: "tzoneid(${1:time-zone-id})",
         documentation: "Returns the current time zone ID.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzonename",
         label: "tzonename(time-zone-id, datetime)",
         insertText: "tzonename(${1:time-zone-id}, ${2:datetime})",
         documentation: "Returns the current standard or daylight savings time, time zone name.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzoneoff",
         label: "tzoneoff(time-zone-id, datetime)",
         insertText: "tzoneoff(${1:time-zone-id}, ${2:datetime})",
         documentation: "Returns the user time zone offset.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzones2u",
         label: "tzones2u(datetime, time-zone-id)",
         insertText: "tzones2u(${1:datetime}, ${2:time-zone-id})",
         documentation: "Converts a SAS date time value to a UTC date time value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzonesttname",
         label: "tzonesttname(time-zone-id)",
         insertText: "tzonesttname(${1:time-zone-id})",
         documentation: "Returns a standard time zone name.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzonesttoff",
         label: "tzonesttoff(time-zone-id)",
         insertText: "tzonesttoff(${1:time-zone-id})",
         documentation: "Returns the time zone offset value for the specified standard time.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "tzoneu2s",
         label: "tzoneu2s(UTC, time-zone-id)",
         insertText: "tzoneu2s(${1:UTC}, ${2:time-zone-id})",
         documentation: "Converts a UTC date time value to a SAS date time value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "unicode",
         label: "unicode(str, instr, Unicode)",
         insertText: "unicode(${1:str}, ${2:instr}, ${3:Unicode})",
         documentation: "Converts Unicode characters to the current SAS session encoding.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "unicodec",
         label: "unicodec(str, instr, Unicode)",
         insertText: "unicodec(${1:str}, ${2:instr}, ${3:Unicode})",
         documentation: "Converts characters in the current SAS session encoding to Unicode characters.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "upcase",
         label: "upcase(argument)",
         insertText: "upcase(${1:argument})",
         documentation: "Converts all lowercase single-width English alphabet letters in an argument to uppercase.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "upper",
         label: "upper(sql-expression)",
         insertText: "upper(${1:sql-expression})",
         documentation: "Converts the case of a character string to uppercase.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "urldecode",
         label: "urldecode(argument)",
         insertText: "urldecode(${1:argument})",
         documentation: "Returns a string that was decoded using the URL escape syntax.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "urlencode",
         label: "urlencode(argument)",
         insertText: "urlencode(${1:argument})",
         documentation: "Returns a string that was encoded using the URL escape syntax.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "uss",
         label: "uss(argument)",
         insertText: "uss(${1:argument})",
         documentation: "Returns the uncorrected sum of squares of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "uuidgen",
         label: "uuidgen(maximum-warnings, binary-result)",
         insertText: "uuidgen(${1:maximum-warnings}, ${2:binary-result})",
         documentation: "Returns a Universally Unique Identifier (UUID) as a string of 36 hexidecimal characters and hyphens or a binary value of 16 bytes.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "var",
         label: "var(argument)",
         insertText: "var(${1:argument})",
         documentation: "Returns the variance of the nonmissing arguments.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "varfmt",
         label: "varfmt(data-set-id, variable-number)",
         insertText: "varfmt(${1:data-set-id}, ${2:variable-number})",
         documentation: "Returns the format that is assigned to a SAS data set variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "varinfmt",
         label: "varinfmt(data-set-id, variable-number)",
         insertText: "varinfmt(${1:data-set-id}, ${2:variable-number})",
         documentation: "Returns the informat that is assigned to a SAS data set variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "varlabel",
         label: "varlabel(data-set-id, variable-number)",
         insertText: "varlabel(${1:data-set-id}, ${2:variable-number})",
         documentation: "Returns the label that is assigned to a SAS data set variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "varlen",
         label: "varlen(data-set-id, variable-number)",
         insertText: "varlen(${1:data-set-id}, ${2:variable-number})",
         documentation: "Returns the length of a SAS data set variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "varname",
         label: "varname(data-set-id, variable-number)",
         insertText: "varname(${1:data-set-id}, ${2:variable-number})",
         documentation: "Returns the name of a SAS data set variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "varnum",
         label: "varnum(data-set-id, variable-name)",
         insertText: "varnum(${1:data-set-id}, ${2:variable-name})",
         documentation: "Returns the number of a variable's position in a SAS data set.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "varray",
         label: "varray(name)",
         insertText: "varray(${1:name})",
         documentation: "Returns a value that indicates whether the specified name is an array.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "varrayx",
         label: "varrayx(expression)",
         insertText: "varrayx(${1:expression})",
         documentation: "Returns a value that indicates whether the value of the specified argument is an array.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vartranscode",
         label: "vartranscode(data-set-id, var-num)",
         insertText: "vartranscode(${1:data-set-id}, ${2:var-num})",
         documentation: "Returns the transcode attribute of a SAS data set variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vartype",
         label: "vartype(data-set-id, variable-number)",
         insertText: "vartype(${1:data-set-id}, ${2:variable-number})",
         documentation: "Returns the data type of a SAS data set variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "verify",
         label: "verify(source, excerpt)",
         insertText: "verify(${1:source}, ${2:excerpt})",
         documentation: "Returns the position of the first character in a string that is not in specified data strings.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vformat",
         label: "vformat(variable)",
         insertText: "vformat(${1:variable})",
         documentation: "Returns the format that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vformatd",
         label: "vformatd(variable)",
         insertText: "vformatd(${1:variable})",
         documentation: "Returns the decimal value of the format that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vformatdx",
         label: "vformatdx(expression)",
         insertText: "vformatdx(${1:expression})",
         documentation: "Returns the decimal value of the format that is associated with the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vformatn",
         label: "vformatn(variable)",
         insertText: "vformatn(${1:variable})",
         documentation: "Returns the format name that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vformatnx",
         label: "vformatnx(expression)",
         insertText: "vformatnx(${1:expression})",
         documentation: "Returns the format name that is associated with the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vformatw",
         label: "vformatw(variable)",
         insertText: "vformatw(${1:variable})",
         documentation: "Returns the format width that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vformatwx",
         label: "vformatwx(expression)",
         insertText: "vformatwx(${1:expression})",
         documentation: "Returns the format width that is associated with the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vformatx",
         label: "vformatx(expression)",
         insertText: "vformatx(${1:expression})",
         documentation: "Returns the format that is associated with the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinarray",
         label: "vinarray(variable)",
         insertText: "vinarray(${1:variable})",
         documentation: "Returns a value that indicates whether the specified variable is a member of an array.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinarrayx",
         label: "vinarrayx(expression)",
         insertText: "vinarrayx(${1:expression})",
         documentation: "Returns a value that indicates whether the value of the specified argument is a member of an array.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinformat",
         label: "vinformat(variable)",
         insertText: "vinformat(${1:variable})",
         documentation: "Returns the informat that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinformatd",
         label: "vinformatd(variable)",
         insertText: "vinformatd(${1:variable})",
         documentation: "Returns the decimal value of the informat that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinformatdx",
         label: "vinformatdx(expression)",
         insertText: "vinformatdx(${1:expression})",
         documentation: "Returns the decimal value of the informat that is associated with the value of the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinformatn",
         label: "vinformatn(variable)",
         insertText: "vinformatn(${1:variable})",
         documentation: "Returns the informat name that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinformatnx",
         label: "vinformatnx(expression)",
         insertText: "vinformatnx(${1:expression})",
         documentation: "Returns the informat name that is associated with the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinformatw",
         label: "vinformatw(variable)",
         insertText: "vinformatw(${1:variable})",
         documentation: "Returns the informat width that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinformatwx",
         label: "vinformatwx(expression)",
         insertText: "vinformatwx(${1:expression})",
         documentation: "Returns the informat width that is associated with the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vinformatx",
         label: "vinformatx(expression)",
         insertText: "vinformatx(${1:expression})",
         documentation: "Returns the informat that is associated with the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vlabel",
         label: "vlabel(variable)",
         insertText: "vlabel(${1:variable})",
         documentation: "Returns the label that is associated with the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vlabelx",
         label: "vlabelx(expression)",
         insertText: "vlabelx(${1:expression})",
         documentation: "Returns the label that is associated with the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vlength",
         label: "vlength(variable)",
         insertText: "vlength(${1:variable})",
         documentation: "Returns the compile-time (allocated) size of the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vlengthx",
         label: "vlengthx(expression)",
         insertText: "vlengthx(${1:expression})",
         documentation: "Returns the compile-time (allocated) size for the variable with a name that is the same as the value of the argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vname",
         label: "vname(variable)",
         insertText: "vname(${1:variable})",
         documentation: "Returns the name of the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vnamex",
         label: "vnamex(expression)",
         insertText: "vnamex(${1:expression})",
         documentation: "Validates the value of the specified argument as a variable name.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vtranscode",
         label: "vtranscode(var)",
         insertText: "vtranscode(${1:var})",
         documentation: "Returns a value that indicates whether transcoding is enabled for the specified character variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vtranscodex",
         label: "vtranscodex(var)",
         insertText: "vtranscodex(${1:var})",
         documentation: "Returns a value that indicates whether transcoding is enabled for the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vtype",
         label: "vtype(variable)",
         insertText: "vtype(${1:variable})",
         documentation: "Returns the type (character or numeric) of the specified variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vtypex",
         label: "vtypex(expression)",
         insertText: "vtypex(${1:expression})",
         documentation: "Returns the type (character or numeric) for the value of the specified argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vvalue",
         label: "vvalue(variable)",
         insertText: "vvalue(${1:variable})",
         documentation: "Returns the formatted value that is associated with the variable that you specify.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "vvaluex",
         label: "vvaluex(expression)",
         insertText: "vvaluex(${1:expression})",
         documentation: "Returns the formatted value that is associated with the argument that you specify.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "week",
         label: "week(sas-date, U, V, W)",
         insertText: "week(${1:sas-date}, ${2:U}, ${3:V}, ${4:W})",
         documentation: "Returns the week-number value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "weekday",
         label: "weekday(date)",
         insertText: "weekday(${1:date})",
         documentation: "From a SAS date value, returns an integer that corresponds to the day of the week.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "whichc",
         label: "whichc(string, value)",
         insertText: "whichc(${1:string}, ${2:value})",
         documentation: "Searches for a character value that is equal to the first argument, and returns the index of the first matching value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "whichn",
         label: "whichn(argument, value)",
         insertText: "whichn(${1:argument}, ${2:value})",
         documentation: "Searches for a numeric value that is equal to the first argument, and returns the index of the first matching value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "write_array",
         label: "write_array(rc, data_set_name, array_variable, column_name)",
         insertText: "write_array(${1:rc}, ${2:data_set_name}, ${3:array_variable}, ${4:column_name})",
         documentation: "Writes data from a PROC FCMP array variable to a data set that can then be used by SAS programs, macros, and procedures.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "year",
         label: "year(date)",
         insertText: "year(${1:date})",
         documentation: "Returns the year from a SAS date value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "yieldp",
         label: "yieldp(A, c, n, K, k0, p)",
         insertText: "yieldp(${1:A}, ${2:c}, ${3:n}, ${4:K}, ${5:k0}, ${6:p})",
         documentation: "Returns the yield-to-maturity for a periodic cash flow stream, such as a bond.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "yrdif",
         label: "yrdif(start-date, end-date, '30/360', 'ACT/ACT', 'ACT/360', 'ACT/365', 'AGE')",
         insertText: "yrdif(${1:start-date}, ${2:end-date}, ${3:'30/360'}, ${4:'ACT/ACT'}, ${5:'ACT/360'}, ${6:'ACT/365'}, ${7:'AGE'})",
         documentation: "Returns the difference in years between two dates according to specified day count conventions; returns a person\u2019s age.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "yyq",
         label: "yyq(year, quarter)",
         insertText: "yyq(${1:year}, ${2:quarter})",
         documentation: "Returns a SAS date value from year and quarter year values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "zipcity",
         label: "zipcity(ZIP-code)",
         insertText: "zipcity(${1:ZIP-code})",
         documentation: "Returns a city name and the two-character postal code that corresponds to a ZIP code.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "zipcitydistance",
         label: "zipcitydistance(ZIP-code)",
         insertText: "zipcitydistance(${1:ZIP-code})",
         documentation: "Returns the geodetic distance between two ZIP code locations.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "zipfips",
         label: "zipfips(ZIP-code)",
         insertText: "zipfips(${1:ZIP-code})",
         documentation: "Converts ZIP codes to two-digit FIPS codes.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "zipname",
         label: "zipname(ZIP-code)",
         insertText: "zipname(${1:ZIP-code})",
         documentation: "Converts ZIP codes to uppercase state names.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "zipnamel",
         label: "zipnamel(ZIP-code)",
         insertText: "zipnamel(${1:ZIP-code})",
         documentation: "Converts ZIP codes to mixed-case state names.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "zipstate",
         label: "zipstate(ZIP-code)",
         insertText: "zipstate(${1:ZIP-code})",
         documentation: "Converts ZIP codes to two-character state postal codes.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dmsrvbatchjob",
         label: "dmsrvbatchjob(job-name, host, port, parameter-list)",
         insertText: "dmsrvbatchjob(${1:job-name}, ${2:host}, ${3:port}, ${4:parameter-list})",
         documentation: "Runs a DataFlux data or process job on a DataFlux Data Management Server and returns a job identifier.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dmsrvcopylog",
         label: "dmsrvcopylog(job\u2013ID, host, port, filename)",
         insertText: "dmsrvcopylog(${1:job\u2013ID}, ${2:host}, ${3:port}, ${4:filename})",
         documentation: "Copies a job's log file from a DataFlux Data Management Server to a local host.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dmsrvdeletelog",
         label: "dmsrvdeletelog(job-ID, host, port)",
         insertText: "dmsrvdeletelog(${1:job-ID}, ${2:host}, ${3:port})",
         documentation: "Deletes a job's log file from a DataFlux Data Management Server.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dmsrvjobstatus",
         label: "dmsrvjobstatus(job-ID, host, port, time-out, interval)",
         insertText: "dmsrvjobstatus(${1:job-ID}, ${2:host}, ${3:port}, ${4:time-out}, ${5:interval})",
         documentation: "Returns the status of a job that was submitted to a DataFlux Data Management Server.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dmsrvkilljob",
         label: "dmsrvkilljob(job-ID, host, port)",
         insertText: "dmsrvkilljob(${1:job-ID}, ${2:host}, ${3:port})",
         documentation: "Terminates a job that is running on a DataFlux Data Management Server.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dmsrvprofilejob",
         label: "dmsrvprofilejob(job-name, host, port, append-flag, description-character)",
         insertText: "dmsrvprofilejob(${1:job-name}, ${2:host}, ${3:port}, ${4:append-flag}, ${5:description-character})",
         documentation: "Generates a profile from a Data Management server repository.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dmsrvuser",
         label: "dmsrvuser(user-ID, password)",
         insertText: "dmsrvuser(${1:user-ID}, ${2:password})",
         documentation: "Registers a user on a DataFlux Data Management Server.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dmsrvver",
         label: "dmsrvver(host, port)",
         insertText: "dmsrvver(${1:host}, ${2:port})",
         documentation: "Returns the version of the DataFlux Data Management Server.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqcase",
         label: "dqcase(character-value, case-definition, locale)",
         insertText: "dqcase(${1:character-value}, ${2:case-definition}, ${3:locale})",
         documentation: "Returns a character value with standardized capitalization.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqextinfoget",
         label: "dqextinfoget(extraction-definition, locale)",
         insertText: "dqextinfoget(${1:extraction-definition}, ${2:locale})",
         documentation: "Returns the names of the tokens that are supported by an extraction definition.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqextract",
         label: "dqextract(character-value, extraction-definition, locale)",
         insertText: "dqextract(${1:character-value}, ${2:extraction-definition}, ${3:locale})",
         documentation: "Returns a delimited string of extraction token values from an input character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqexttokenget",
         label: "dqexttokenget(delimited-string, token, extraction-definition, locale)",
         insertText: "dqexttokenget(${1:delimited-string}, ${2:token}, ${3:extraction-definition}, ${4:locale})",
         documentation: "Returns an extraction token value from a delimited string of extraction token values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqexttokenput",
         label: "dqexttokenput(delimited-string, token-value, token-name, extraction-definition, locale)",
         insertText: "dqexttokenput(${1:delimited-string}, ${2:token-value}, ${3:token-name}, ${4:extraction-definition}, ${5:locale})",
         documentation: "Inserts an extraction token value into a delimited string of extraction token values and returns the updated delimited string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqgender",
         label: "dqgender(character-value, gender-analysis-definition, locale)",
         insertText: "dqgender(${1:character-value}, ${2:gender-analysis-definition}, ${3:locale})",
         documentation: "Returns a gender determination from the name of an individual.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqgenderinfoget",
         label: "dqgenderinfoget(gender-analysis-definition, locale)",
         insertText: "dqgenderinfoget(${1:gender-analysis-definition}, ${2:locale})",
         documentation: "Returns the name of the parse definition that is associated with the specified gender definition.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqgenderparsed",
         label: "dqgenderparsed(delimited-string, gender-analysis-definition, locale)",
         insertText: "dqgenderparsed(${1:delimited-string}, ${2:gender-analysis-definition}, ${3:locale})",
         documentation: "Returns the gender of an individual from a delimited string of parse token values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqidentify",
         label: "dqidentify(character-value, identification-analysis-definition, locale)",
         insertText: "dqidentify(${1:character-value}, ${2:identification-analysis-definition}, ${3:locale})",
         documentation: "Returns the highest-scoring identity for a character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqidentifyidget",
         label: "dqidentifyidget(delimited-string, identity-name, identification-analysis-definition, locale)",
         insertText: "dqidentifyidget(${1:delimited-string}, ${2:identity-name}, ${3:identification-analysis-definition}, ${4:locale})",
         documentation: "Returns an identification analysis score for a given identity from a delimited string of identification analysis scores.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqidentifyinfoget",
         label: "dqidentifyinfoget(identification-analysis-definition, locale)",
         insertText: "dqidentifyinfoget(${1:identification-analysis-definition}, ${2:locale})",
         documentation: "Returns the names of the identities that are supported by a given identification analysis definition.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqidentifymulti",
         label: "dqidentifymulti(character-value, identification-analysis-definition, locale)",
         insertText: "dqidentifymulti(${1:character-value}, ${2:identification-analysis-definition}, ${3:locale})",
         documentation: "Returns all of the identification analysis scores of a character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqlocaleguess",
         label: "dqlocaleguess(character-value, locale-guess-definition)",
         insertText: "dqlocaleguess(${1:character-value}, ${2:locale-guess-definition})",
         documentation: "Returns the ISO code of the highest-scoring locale for a character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqlocaleinfoget",
         label: "dqlocaleinfoget(info-type)",
         insertText: "dqlocaleinfoget(${1:info-type})",
         documentation: "Returns a list of the locales that are loaded into memory.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqlocaleinfolist",
         label: "dqlocaleinfolist(definition-type, locale)",
         insertText: "dqlocaleinfolist(${1:definition-type}, ${2:locale})",
         documentation: "Returns a count of definitions and displays the names of definitions for a type of definition in a locale.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqlocalescore",
         label: "dqlocalescore(character-value, locale-guess-definition, locale)",
         insertText: "dqlocalescore(${1:character-value}, ${2:locale-guess-definition}, ${3:locale})",
         documentation: "Returns a locale confidence score for an input character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqmatch",
         label: "dqmatch(character-value, match-definition, sensitivity, locale)",
         insertText: "dqmatch(${1:character-value}, ${2:match-definition}, ${3:sensitivity}, ${4:locale})",
         documentation: "Returns a match code from a character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqmatchinfoget",
         label: "dqmatchinfoget(match-definition, locale)",
         insertText: "dqmatchinfoget(${1:match-definition}, ${2:locale})",
         documentation: "Returns the name of the parse definition that is associated with a match definition.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqmatchparsed",
         label: "dqmatchparsed(delimited-string, match-definition, sensitivity, locale)",
         insertText: "dqmatchparsed(${1:delimited-string}, ${2:match-definition}, ${3:sensitivity}, ${4:locale})",
         documentation: "Returns a match code from a delimited string of parse token values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqoptsurface",
         label: "dqoptsurface(surface-flag)",
         insertText: "dqoptsurface(${1:surface-flag})",
         documentation: "Reveals or hides non-surfaced definitions.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqparse",
         label: "dqparse(character-value, parse-definition, locale)",
         insertText: "dqparse(${1:character-value}, ${2:parse-definition}, ${3:locale})",
         documentation: "Returns a delimited string of parse token values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqparseinfoget",
         label: "dqparseinfoget(parse-definition, locale)",
         insertText: "dqparseinfoget(${1:parse-definition}, ${2:locale})",
         documentation: "Returns the names of the tokens that are supported by a parse definition.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqparseinputlen",
         label: "dqparseinputlen(input-length)",
         insertText: "dqparseinputlen(${1:input-length})",
         documentation: "Overrides the default expected length of parsed input and returns a string indicating its previous value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqparsereslimit",
         label: "dqparsereslimit(resource-limit)",
         insertText: "dqparsereslimit(${1:resource-limit})",
         documentation: "Overrides the default expected limit on resources consumed during parsing.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqparsescordepth",
         label: "dqparsescordepth(level)",
         insertText: "dqparsescordepth(${1:level})",
         documentation: "Overrides the default value that determines how deeply to search for the best parsing score.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqparsetokenget",
         label: "dqparsetokenget(delimited-string, token, parse-definition, locale)",
         insertText: "dqparsetokenget(${1:delimited-string}, ${2:token}, ${3:parse-definition}, ${4:locale})",
         documentation: "Returns a parse token value from a delimited string of parse token values.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqparsetokenput",
         label: "dqparsetokenput(delimited-string, token-value, token-name, parse-definition, locale)",
         insertText: "dqparsetokenput(${1:delimited-string}, ${2:token-value}, ${3:token-name}, ${4:parse-definition}, ${5:locale})",
         documentation: "Inserts a parse token value into a delimited string of parse token values and returns the updated delimited string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqpattern",
         label: "dqpattern(character-value, pattern-analysis-definition, locale)",
         insertText: "dqpattern(${1:character-value}, ${2:pattern-analysis-definition}, ${3:locale})",
         documentation: "Returns a pattern analysis from a character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqschemeapply",
         label: "dqschemeapply(character-value, scheme, QKB, NOQKB, PHRASE, ELEMENT, EXACT, IGNORE_CASE, USE_MATCHDEF, match-definition, sensitivity, locale)",
         insertText: "dqschemeapply(${1:character-value}, ${2:scheme}, ${3:QKB}, ${4:NOQKB}, ${5:PHRASE}, ${6:ELEMENT}, ${7:EXACT}, ${8:IGNORE_CASE}, ${9:USE_MATCHDEF}, ${10:match-definition}, ${11:sensitivity}, ${12:locale})",
         documentation: "Applies a scheme and returns a transformed character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqstandardize",
         label: "dqstandardize(character-value, standardization-definition, locale)",
         insertText: "dqstandardize(${1:character-value}, ${2:standardization-definition}, ${3:locale})",
         documentation: "Standardizes the casing, spacing, and format of certain words and abbreviations and returns an updated character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "dqtoken",
         label: "dqtoken(character-value, token, parse-definition, locale)",
         insertText: "dqtoken(${1:character-value}, ${2:token}, ${3:parse-definition}, ${4:locale})",
         documentation: "Returns the value of a token from an input character value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%bquote",
         label: "%bquote(character-string)",
         insertText: "%bquote(${1:character-string})",
         documentation: "Mask special characters and mnemonic operators in a resolved value at macro execution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%eval",
         label: "%eval(expression)",
         insertText: "%eval(${1:expression})",
         documentation: "Evaluates arithmetic and logical expressions using integer arithmetic.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%index",
         label: "%index(source-string, target-string)",
         insertText: "%index(${1:source-string}, ${2:target-string})",
         documentation: "Returns the position of the first character of a string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%kcmpres",
         label: "%kcmpres(text)",
         insertText: "%kcmpres(${1:text})",
         documentation: "Compresses multiple blanks and removes leading and trailing blanks.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%kindex",
         label: "%kindex(source, string)",
         insertText: "%kindex(${1:source}, ${2:string})",
         documentation: "Returns the position of the first character of a string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%kscan",
         label: "%kscan(argument, n, delimiter)",
         insertText: "%kscan(${1:argument}, ${2:n}, ${3:delimiter})",
         documentation: "Search for a word that is specified by its position in a string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%ksubstr",
         label: "%ksubstr(argument, position, length)",
         insertText: "%ksubstr(${1:argument}, ${2:position}, ${3:length})",
         documentation: "Produce a substring of a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%length",
         label: "%length(character-string)",
         insertText: "%length(${1:character-string})",
         documentation: "Returns the length of a string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%nrbquote",
         label: "%nrbquote(character-string)",
         insertText: "%nrbquote(${1:character-string})",
         documentation: "Masks special characters, including & and %, and mnemonic operators in a resolved value at macro execution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%nrquote",
         label: "%nrquote(character-string)",
         insertText: "%nrquote(${1:character-string})",
         documentation: "Masks special characters, including & and %, and mnemonic operators in a resolved value at macro execution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%nrstr",
         label: "%nrstr(character-string)",
         insertText: "%nrstr(${1:character-string})",
         documentation: "Masks special characters, including & and %, and mnemonic operators in constant text during macro compilation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%qkcmpres",
         label: "%qkcmpres(text)",
         insertText: "%qkcmpres(${1:text})",
         documentation: "Compresses multiple blanks and removes leading and trailing blanks.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%qkscan",
         label: "%qkscan(argument, n, delimiter)",
         insertText: "%qkscan(${1:argument}, ${2:n}, ${3:delimiter})",
         documentation: "Search for a word that is specified by its position in a string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%qksubstr",
         label: "%qksubstr(argument, position, length)",
         insertText: "%qksubstr(${1:argument}, ${2:position}, ${3:length})",
         documentation: "Produce a substring of a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%qscan",
         label: "%qscan(character-string, n, charlist, modifiers)",
         insertText: "%qscan(${1:character-string}, ${2:n}, ${3:charlist}, ${4:modifiers})",
         documentation: "Searches for a word and masks special characters and mnemonic operators.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%qsubstr",
         label: "%qsubstr(character-string, position, length)",
         insertText: "%qsubstr(${1:character-string}, ${2:position}, ${3:length})",
         documentation: "Produces a substring and masks special characters and mnemonic operators.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%qsysfunc",
         label: "%qsysfunc(function, arguments, format)",
         insertText: "%qsysfunc(${1:function}, ${2:arguments}, ${3:format})",
         documentation: "Executes functions and masks special characters and mnemonic operators.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%quote",
         label: "%quote(character-string)",
         insertText: "%quote(${1:character-string})",
         documentation: "Mask special characters and mnemonic operators in a resolved value at macro execution.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%qupcase",
         label: "%qupcase(character-string)",
         insertText: "%qupcase(${1:character-string})",
         documentation: "Converts a value to uppercase and returns a result that masks special characters and mnemonic operators.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%scan",
         label: "%scan(character-string, n, delimiters, modifiers)",
         insertText: "%scan(${1:character-string}, ${2:n}, ${3:delimiters}, ${4:modifiers})",
         documentation: "Searches for a word that is specified by its position in a string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%str",
         label: "%str(character-string)",
         insertText: "%str(${1:character-string})",
         documentation: "Mask special characters and mnemonic operators in constant text at macro compilation.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%substr",
         label: "%substr(character-string, position, length)",
         insertText: "%substr(${1:character-string}, ${2:position}, ${3:length})",
         documentation: "Produce a substring of a character string.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%superq",
         label: "%superq(macro-variable-name)",
         insertText: "%superq(${1:macro-variable-name})",
         documentation: "Masks all special characters and mnemonic operators at macro execution but prevents further resolution of the value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%symexist",
         label: "%symexist(macro-variable-name)",
         insertText: "%symexist(${1:macro-variable-name})",
         documentation: "Returns an indication of the existence of a macro variable.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%symglobl",
         label: "%symglobl(macro-variable-name)",
         insertText: "%symglobl(${1:macro-variable-name})",
         documentation: "Returns an indication as to whether a macro variable is global in scope.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%symlocal",
         label: "%symlocal(macro-variable-name)",
         insertText: "%symlocal(${1:macro-variable-name})",
         documentation: "Returns an indication as to whether a macro variable is local in scope.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%sysevalf",
         label: "%sysevalf(expression, BOOLEAN, CEIL, FLOOR, INTEGER)",
         insertText: "%sysevalf(${1:expression}, ${2:BOOLEAN}, ${3:CEIL}, ${4:FLOOR}, ${5:INTEGER})",
         documentation: "Evaluates arithmetic and logical expressions using floating-point arithmetic.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%sysfunc",
         label: "%sysfunc(function, arguments, format)",
         insertText: "%sysfunc(${1:function}, ${2:arguments}, ${3:format})",
         documentation: "Execute SAS functions or user-written functions.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%sysget",
         label: "%sysget(environment-variable)",
         insertText: "%sysget(${1:environment-variable})",
         documentation: "Returns the character string that is the value of the environment variable passed as the argument.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%sysmacexec",
         label: "%sysmacexec(macro-name)",
         insertText: "%sysmacexec(${1:macro-name})",
         documentation: "Returns an indication of the execution status of a macro.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%sysmacexist",
         label: "%sysmacexist(macro-name)",
         insertText: "%sysmacexist(${1:macro-name})",
         documentation: "Returns an indication of the existence of a macro definition in the Work.SASMacr catalog. Otherwise, the returned value is 0.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%sysmexecname",
         label: "%sysmexecname(0, >0)",
         insertText: "%sysmexecname(${1:0}, ${2:>0})",
         documentation: "Returns the name of the macro executing at a requested nesting level.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%sysprod",
         label: "%sysprod(product-code)",
         insertText: "%sysprod(${1:product-code})",
         documentation: "Reports whether a SAS software product is licensed at the site.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%unquote",
         label: "%unquote(character-string)",
         insertText: "%unquote(${1:character-string})",
         documentation: "During macro execution, unmasks all special characters and mnemonic operators for a value.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%upcase",
         label: "%upcase(character-string)",
         insertText: "%upcase(${1:character-string})",
         documentation: "Convert values to uppercase.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "%validchs",
         label: "%validchs(dsnm=, libnm=, ENCODING=, COMPATIBLE=)",
         insertText: "%validchs(${1:dsnm=}, ${2:libnm=}, ${3:ENCODING=}, ${4:COMPATIBLE=})",
         documentation: "Validates the character(s) encoding compatibility for data set variables.",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "print",
         label: "proc print data=$1;run;",
         insertText: "proc print data=$1;\nrun;\n",
         documentation: "PROC PRINT template",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "import",
         label: "proc import datafile=$1 out=$2 dbms=$3;run;",
         insertText: "proc import datafile=$1 out=$2 dbms=$3;\nrun;\n",
         documentation: "PROC IMPORT template",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "export",
         label: "proc export data=$1 outfile=$2 dbms=$3;run;",
         insertText: "proc export data=$1 outfile=$2 dbms=$3;\nrun;\n",
         documentation: "PROC EXPORT template",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "ds2",
         label: "proc ds2;data;\tmethod init();\t\t$1\tend;enddata;run;quit;",
         insertText: "proc ds2;\ndata;\n\n\tmethod init();\n\t\t$1\n\tend;\n\nenddata;\nrun;\nquit;\n",
         documentation: "PROC DS2 template",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
         filterText: "sql",
         label: "proc sql;\tselect $1\tfrom $2\twhere $3;quit;",
         insertText: "proc sql;\n\tselect $1\n\tfrom $2\n\twhere $3;\nquit;\n",
         documentation: "PROC SQL template",
         kind: monaco.languages.CompletionItemKind.Function,
         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }]
   )
}

require(['vs/editor/editor.main'], function () {
   sas_completion(monaco);
})
