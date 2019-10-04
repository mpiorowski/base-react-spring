package base.api.config.mybatis;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@MappedTypes(List.class)
@MappedJdbcTypes(JdbcType.ARRAY)
public class ListTypeHandler extends BaseTypeHandler<List<String>> {

  @Override
  public void setNonNullParameter(
      PreparedStatement psmt, int columnIndex, List<String> list, JdbcType jdbcType)
      throws SQLException {

    if (list == null || list.isEmpty()) {
      psmt.setArray(columnIndex, null);
      return;
    }
    String[] datum = new String[list.size()];

    for (int i = 0; i < list.size(); i++) {

      datum[i] = list.get(i);
    }

    psmt.setArray(columnIndex, psmt.getConnection().createArrayOf("varchar", datum));
  }

  @Override
  public List<String> getNullableResult(ResultSet rs, String columnName) throws SQLException {

    return getArrayListFromSqlArray(rs.getArray(columnName));
  }

  @Override
  public List<String> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {

    return getArrayListFromSqlArray(rs.getArray(columnIndex));
  }

  @Override
  public List<String> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {

    return getArrayListFromSqlArray(cs.getArray(columnIndex));
  }

  private List<String> getArrayListFromSqlArray(Array array) throws SQLException {

    if (array == null) {
      return Collections.emptyList();
    }
    String[] datum = (String[]) array.getArray();
    if (datum == null) {

      return Collections.emptyList();
    }
    List<String> list = new ArrayList<>();
    Collections.addAll(list, datum);

    return list;
  }
}
