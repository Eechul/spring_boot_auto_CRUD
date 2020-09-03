package ${TARGET_PACKAGE}

@Mapper
public interface ${NAMING}Repo {
    
	public List<${NAMING}Vo> list(@Param("page") PageP page, @Param("columnNm") String columnNm, @Param("searchVal") String searchVal);
	public Long list_c(@Param("page") PageP page, @Param("columnNm") String columnNm, @Param("searchVal") String searchVal);
	public Long save(${NAMING}Vo ${NAMING_FIRST_LOWER}Vo);
	public Long update(${NAMING}Vo ${NAMING_FIRST_LOWER}Vo);
	public Long delete(${KEY_WHERE});
	public ${NAMING}Vo findOne(${KEY_WHERE});

}
