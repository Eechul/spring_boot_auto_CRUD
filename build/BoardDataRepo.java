package ${TARGET_PACKAGE}

@Mapper
public interface BoardDataRepo {
    
	public List<BoardDataVo> list(@Param("page") PageP page, @Param("columnNm") String columnNm, @Param("searchVal") String searchVal);
	public Long list_c(@Param("page") PageP page, @Param("columnNm") String columnNm, @Param("searchVal") String searchVal);
	public Long save(BoardDataVo boardDataVo);
	public Long update(BoardDataVo boardDataVo);
	public Long delete(@Param("no") Long no);
	public BoardDataVo findOne(@Param("no") Long no);

}
