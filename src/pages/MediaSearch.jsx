import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar, useMediaQuery } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";

const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, err } = await mediaApi.search({
      mediaType,
      query,
      page,
    });

    setOnSearch(false);

    if (err) toast.error(err.message);
    if (response) {
      if (page > 1) setMedias((m) => [...m, ...response.results]);
      else setMedias([...response.results]);
    }
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };
  window.onscroll = function() {
    if(window.scrollY + window.innerHeight >= window.document.body.offsetHeight - 100){
      setPage(page + 1)
    }

  }
  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent,marginTop:"20px"}}>
        <Stack spacing={1} >
          <Box sx={{display:"flex",flexDirection:{md:"row",xs:"column"}}}>
            <Box sx={{marginRight:{md:"30px",xs:"0px"},marginBottom:{md:"0px", xs:"20px"}}}>
          
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                sx={{ width: "100%" }}
              >
                {mediaTypes.map((item, index) => (
                  <Button
                    size="large"
                    key={index}
                    variant={mediaType === item ? "contained" : "text"}
                    sx={{
                      color:
                        mediaType === item
                          ? "primary.contrastText"
                          : "text.primary",
                      padding:"10px"
                    }}
                    onClick={() => onCategoryChange(item)}
                  >
                    {item}
                  </Button>
                ))}
              </Stack>
              <TextField
                color="success"
                placeholder="Search"
                sx={{ width: "100%", marginTop: "20px" }}
                autoFocus
                onChange={onQueryChange}
                />
            </Box>
            <Box sx={{width:"100%"}}>
              <MediaGrid medias={medias} mediaType={mediaType} />
    
    
              {/* {medias.length > 0 && (
                <Button variant="contained" style={{width:"100%",marginTop:"20px"}} loading={onSearch} onClick={() => setPage(page + 1)}>
                  load more
                </Button>
              )} */}
            </Box>
          </Box >
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
