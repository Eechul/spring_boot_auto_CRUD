package ${TARGET_PACKAGE};

@Service
public class ${NAMING}Service {

	@Autowired
	private ${NAMING}Repo ${NAMING_FIRST_LOWER}Repo;
	
	public ProcResult save(${NAMING}Vo ${NAMING_FIRST_LOWER}Vo) {
		ProcResult proc = ProcResult.make(true);
		
		// 예외처리 알아서
		${NAMING_FIRST_LOWER}Repo.save(${NAMING_FIRST_LOWER}Vo);
		return proc;
	}
	
	public ${NAMING}Vo findOne(Long ${KEY_LOWER}) {
		return ${NAMING_FIRST_LOWER}Repo.findOne(${KEY_LOWER});
	}
	
	public Pagination<${NAMING}Vo> list(PageP page, String columnNm, String searchVal) {
		return Pagination.build(${NAMING_FIRST_LOWER}Repo.list(page, columnNm, searchVal), ${NAMING_FIRST_LOWER}Repo.list_c(page,columnNm,searchVal), page);
	}
	
	public ProcResult update(Long ${KEY_LOWER}) {
		${NAMING_FIRST_LOWER}Repo.delete(${KEY_LOWER});
		return ProcResult.make(true);
	}

	public ProcResult delete(Long no) {
		${NAMING_FIRST_LOWER}Repo.delete(${KEY_LOWER});
		return ProcResult.make(true);
	}

}
