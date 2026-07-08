# Google Sheets export

The transactions sheet receives the following fields:

| Column | Field |
| --- | --- |
| A | date |
| B | type |
| C | category |
| D | subcategory |
| E | formula-managed value |
| F | amount |
| G | notes |

Column D must receive `subcategory`. Column E must not be written by the application because it is managed by a spreadsheet formula.
